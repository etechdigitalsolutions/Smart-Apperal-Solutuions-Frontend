import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ posts: [] });
}

export async function POST() {
  return NextResponse.json({ message: "Blog post created" });
}
