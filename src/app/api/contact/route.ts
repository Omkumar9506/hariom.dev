import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// In-memory sliding rate-limiter: 4 submissions per 10 minutes per IP
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 4;

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Periodically clean up expired entries
  if (rateLimitMap.size > 200) {
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  record.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

// Validation schema using Zod
const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(80, { message: "Name must be 80 characters or fewer." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address." })
    .max(100, { message: "Email must be 100 characters or fewer." }),
  subject: z
    .string()
    .trim()
    .max(120, { message: "Subject must be 120 characters or fewer." })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(3000, { message: "Message must be 3000 characters or fewer." }),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Extract IP for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "anonymous_client";

    const { allowed, retryAfterSeconds } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        {
          error: `Rate limit reached. Please wait ${Math.ceil(retryAfterSeconds / 60)} minute(s) before sending another message.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfterSeconds.toString(),
          },
        }
      );
    }

    // 2. Parse & Validate request body with Zod
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const firstErrorMessage =
        fieldErrors.name?.[0] ||
        fieldErrors.email?.[0] ||
        fieldErrors.message?.[0] ||
        fieldErrors.subject?.[0] ||
        "Validation failed.";

      return NextResponse.json(
        {
          error: firstErrorMessage,
          details: fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "hari.9506563662@gmail.com";
    const resolvedSubject = subject && subject.trim().length > 0 ? subject : "New Recruiter / Engineering Inquiry";

    // 3. Email Delivery via Resend
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const emailResponse = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: recipientEmail,
        replyTo: email,
        subject: `[Portfolio] ${resolvedSubject} — from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${resolvedSubject}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0b0d11; color: #f2f4f7; padding: 24px; border-radius: 8px;">
            <h2 style="color: #c8ff00; border-bottom: 1px solid #20242e; padding-bottom: 12px; margin-top: 0;">
              New Direct Portfolio Inquiry
            </h2>
            <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #c8ff00;">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Subject:</strong> ${resolvedSubject}</p>
            <hr style="border: 0; border-top: 1px solid #20242e; margin: 16px 0;" />
            <h3 style="color: #9aa2b1; margin-bottom: 8px;">Message:</h3>
            <div style="background-color: #14171f; padding: 16px; border-radius: 6px; white-space: pre-wrap; line-height: 1.5; color: #e6e8eb;">${message}</div>
            <p style="font-size: 11px; color: #606877; margin-top: 20px;">
              Transmitted securely via Hariom Kumar Gupta Portfolio • Direct Reply-To configured for ${email}
            </p>
          </div>
        `,
      });

      if (emailResponse.error) {
        console.error("Resend API error:", emailResponse.error);
        return NextResponse.json(
          {
            error: "Failed to dispatch email via Resend. Please contact directly via email.",
            details: emailResponse.error.message,
          },
          { status: 500 }
        );
      }
    } else {
      // In development / demo mode when RESEND_API_KEY has not yet been set:
      console.log("----------------------------------------");
      console.log("[Portfolio /api/contact - Demo Mode]");
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${resolvedSubject}`);
      console.log(`Message: ${message}`);
      console.log("Set RESEND_API_KEY in .env.local to enable live dispatch.");
      console.log("----------------------------------------");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been transmitted successfully. I will get back to you shortly!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in /api/contact:", error);
    return NextResponse.json(
      {
        error: "An unexpected internal error occurred. Please reach out to me directly at hari.9506563662@gmail.com.",
      },
      { status: 500 }
    );
  }
}
