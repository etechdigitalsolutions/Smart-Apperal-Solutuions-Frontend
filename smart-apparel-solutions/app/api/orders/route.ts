
import { NextRequest, NextResponse } from "next/server";

const MAX_BODY_SIZE = 16 * 1024; // 16 KB

export async function GET() {
  return NextResponse.json(
    { message: "Order listing is not implemented yet." },
    { status: 501 }
  );
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { message: "Content-Type must be application/json." },
      { status: 415 }
    );
  }

  const contentLength = Number(request.headers.get("content-length"));

  if (
    request.headers.has("content-length") &&
    (!Number.isSafeInteger(contentLength) || contentLength < 0)
  ) {
    return NextResponse.json(
      { message: "Invalid Content-Length." },
      { status: 400 }
    );
  }

  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json(
      { message: "Request body is too large." },
      { status: 413 }
    );
  }

  let body: unknown;

  try {
    const rawBody = await request.text();

    // Check the actual body size too; Content-Length can be absent.
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { message: "Request body is too large." },
        { status: 413 }
      );
    }

    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body)
  ) {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  const data = body as Record<string, unknown>;

  // Honeypot: legitimate submissions should leave this field empty.
  if (
    typeof data.website !== "string" ||
    data.website.trim() !== ""
  ) {
    return NextResponse.json(
      { message: "Invalid submission." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message:
        "Request validation passed, but order creation is not implemented yet.",
    },
    { status: 501 }
  );
}
