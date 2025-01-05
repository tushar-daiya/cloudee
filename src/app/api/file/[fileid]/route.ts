import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileid: string }> }
) {
  const fileid = (await params).fileid;

  if (!fileid) {
    return NextResponse.json(
      {
        message: "File ID is required",
        success: false,
      },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileid}`
  );
  const data = await res.json();
  if (!data.ok) {
    return NextResponse.json(
      {
        message: "File not found",
        success: false,
      },
      { status: 404 }
    );
  }
  const url = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${data.result.file_path}`;
  try {
    const file = await fetch(url);
    const fileBuffer = await file.arrayBuffer();

    return new Response(Buffer.from(fileBuffer), {
      headers: {
        "Content-Type": "image/jpg",
        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "File not found",
        success: false,
      },
      { status: 404 }
    );
  }
}
