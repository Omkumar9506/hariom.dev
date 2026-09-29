import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_resume(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    primary_color = colors.HexColor("#0f172a")
    accent_color = colors.HexColor("#0284c7")
    text_color = colors.HexColor("#334155")
    dark_gray = colors.HexColor("#1e293b")
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=0
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=accent_color,
        alignment=0
    )
    
    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_color,
        alignment=0
    )
    
    section_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=primary_color,
        spaceAfter=4,
        textTransform='uppercase'
    )
    
    job_title_style = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=dark_gray
    )
    
    meta_style = ParagraphStyle(
        'JobMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#64748b"),
        alignment=2
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=text_color
    )
    
    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=text_color,
        leftIndent=10,
        firstLineIndent=-7
    )

    story = []

    # Header
    story.append(Paragraph("HARIOM KUMAR GUPTA", title_style))
    story.append(Paragraph("Full-Stack Developer (MERN, Next.js, NestJS) | Open to SDE & Full-Stack Roles", subtitle_style))
    story.append(Spacer(1, 4))
    
    contacts = [
        "<b>Email:</b> hari.9506563662@gmail.com",
        "<b>Location:</b> Lucknow, UP, India",
        "<b>GitHub:</b> github.com/Omkumar9506",
        "<b>LinkedIn:</b> linkedin.com/in/omkumar9506",
        "<b>LeetCode:</b> leetcode.com/omkumar95065 (320+ Solved in Java)"
    ]
    story.append(Paragraph(" • ".join(contacts), contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cbd5e1"), spaceBefore=2, spaceAfter=8))

    # Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
    summary_text = (
        "Full-Stack Developer with deep experience in building real-time WebRTC applications and payment-integrated platforms. "
        "Engineered production-grade systems featuring PostgreSQL, NestJS, Next.js, and Razorpay with robust Role-Based Access Control (RBAC). "
        "Strong foundation in REST API design, JWT authentication, and relational schema modeling. "
        "Passionate problem solver with <b>320+ LeetCode problems solved in Java</b> covering Data Structures & Algorithms."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 8))

    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_style))
    skills_data = [
        [Paragraph("<b>Languages:</b>", body_style), Paragraph("Java, JavaScript (ES6+), TypeScript, C++, Python", body_style)],
        [Paragraph("<b>Frontend:</b>", body_style), Paragraph("React.js, Next.js (App Router), Redux Toolkit, Context API, Tailwind CSS, Bootstrap", body_style)],
        [Paragraph("<b>Backend:</b>", body_style), Paragraph("Node.js, Express.js, NestJS, Spring Boot, REST APIs, WebRTC, Socket.io, WebSockets", body_style)],
        [Paragraph("<b>Auth & Security:</b>", body_style), Paragraph("JWT, Bcrypt, Role-Based Access Control (RBAC)", body_style)],
        [Paragraph("<b>Databases:</b>", body_style), Paragraph("MongoDB, Mongoose, PostgreSQL, MySQL, TypeORM", body_style)],
        [Paragraph("<b>Tools & Platforms:</b>", body_style), Paragraph("Razorpay, Cloudinary, Git, GitHub, Postman, Hoppscotch, Vite, Webpack", body_style)],
        [Paragraph("<b>Core CS:</b>", body_style), Paragraph("Data Structures & Algorithms, DBMS, Operating Systems, System Design", body_style)]
    ]
    t = Table(skills_data, colWidths=[100, 440])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t)
    story.append(Spacer(1, 8))

    # Projects
    story.append(Paragraph("FEATURED PROJECTS", section_style))
    
    # Project 1: SkillShare
    p1_head = [
        [Paragraph("<b>SkillShare: Full Stack Learning Platform</b> | <i>Next.js, NestJS, PostgreSQL, TypeORM, Razorpay</i>", job_title_style),
         Paragraph("GitHub / Live", meta_style)]
    ]
    t_p1 = Table(p1_head, colWidths=[420, 120])
    t_p1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_p1)
    story.append(Paragraph("• Architected multi-role RBAC architecture (Student, Instructor, Admin) with NestJS guards and secure JWT session management.", bullet_style))
    story.append(Paragraph("• Built complete course lifecycle: enrollment flow, video progression tracking, quiz modules, and automated PDF certificate generation.", bullet_style))
    story.append(Paragraph("• Integrated Razorpay payment gateway with webhook verification for idempotent order fulfillment, and Cloudinary for media assets.", bullet_style))
    story.append(Paragraph("• Engineered 25+ RESTful APIs across 6 normalized relational entities with optimized PostgreSQL query indexing.", bullet_style))
    story.append(Spacer(1, 6))

    # Project 2: EduMeet
    p2_head = [
        [Paragraph("<b>EduMeet: Live Video and Chat Learning Platform</b> | <i>React, Node.js, Express, WebRTC, Socket.io, JWT</i>", job_title_style),
         Paragraph("GitHub / Live", meta_style)]
    ]
    t_p2 = Table(p2_head, colWidths=[420, 120])
    t_p2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_p2)
    story.append(Paragraph("• Developed peer-to-peer real-time video communication supporting 50+ concurrent users with sub-second chat latency via WebRTC and Socket.io.", bullet_style))
    story.append(Paragraph("• Enforced role-based meeting controls (Host vs. Student) via custom Express middleware, protecting room access and media signaling.", bullet_style))
    story.append(Paragraph("• Designed MongoDB schemas and 10+ REST endpoints handling meeting persistence, attendee verification, and real-time session logs.", bullet_style))
    story.append(Spacer(1, 6))

    # Project 3: Library Management System
    p3_head = [
        [Paragraph("<b>Library Management System</b> | <i>React, Node.js, Express, MongoDB, JWT, Bcrypt.js</i>", job_title_style),
         Paragraph("GitHub / Live", meta_style)]
    ]
    t_p3 = Table(p3_head, colWidths=[420, 120])
    t_p3.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_p3)
    story.append(Paragraph("• Built end-to-end library operation portal with dual authorization tiers (Admin/Student) and Bcrypt salted password security.", bullet_style))
    story.append(Paragraph("• Implemented automated fine calculation engine and issue/return ledger, cutting manual inventory tracking overhead by 70%.", bullet_style))
    story.append(Paragraph("• Designed modern responsive React interface with real-time book status lookups and RESTful backend on MongoDB.", bullet_style))
    story.append(Spacer(1, 8))

    # Education
    story.append(Paragraph("EDUCATION & CERTIFICATIONS", section_style))
    edu_head = [
        [Paragraph("<b>Dr. A.P.J. Abdul Kalam Technical University (AKTU)</b>, Lucknow", job_title_style),
         Paragraph("Expected 2027", meta_style)],
        [Paragraph("Bachelor of Technology (B.Tech) in Information Technology — Aggregate: <b>72.56%</b>", body_style),
         Paragraph("Lucknow, UP", meta_style)]
    ]
    t_edu = Table(edu_head, colWidths=[400, 140])
    t_edu.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_edu)
    story.append(Spacer(1, 4))
    
    cert_head = [
        [Paragraph("<b>Complete React and Next.js Developer Course</b> — Udemy", job_title_style),
         Paragraph("2025", meta_style)],
        [Paragraph("Hands-on mastery of React 18/19, Next.js App Router, Server Components, SSR/SSG, and State Architecture.", body_style),
         Paragraph("Certified", meta_style)]
    ]
    t_cert = Table(cert_head, colWidths=[400, 140])
    t_cert.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_cert)

    doc.build(story)
    print(f"Generated resume at {output_path}")

if __name__ == "__main__":
    generate_resume("public/resume.pdf")
