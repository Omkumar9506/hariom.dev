import { NextResponse } from "next/server";
import { getLeetCodeActivity } from "@/lib/leetcodeActivity";

export const revalidate = 1800; // 30 minutes cache

export async function GET() {
  const data = await getLeetCodeActivity();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
