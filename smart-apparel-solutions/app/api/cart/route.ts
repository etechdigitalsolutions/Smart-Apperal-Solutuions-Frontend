import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ cart: [] });
}

export async function POST() {
  return NextResponse.json({ message: "Item added to cart" });
}

export async function DELETE() {
  return NextResponse.json({ message: "Cart cleared" });
}
