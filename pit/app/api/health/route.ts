import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { status: "unhealthy", error: String(err) },
      { status: 503 },
    );
  }
}
