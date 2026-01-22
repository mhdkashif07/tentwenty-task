import { NextResponse } from "next/server";

export async function GET() {
  // return demo user info for client convenience
  const demo = { id: "1", name: "Demo User", email: "demo@tentwenty.test" };
  return NextResponse.json(demo);
}
