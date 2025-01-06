import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID as string;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;

const uploadFileToTelegram = async (file: File) => {
  const formData = new FormData();
  formData.append("chat_id", TELEGRAM_CHAT_ID);
  formData.append("photo", file);
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file: File | null = formData.get("file") as File;
    const apiKey: string = formData.get("apiKey") as string;

    //check for apiKey and file
    if (!apiKey) {
      return NextResponse.json(
        {
          message: "API Key is required",
          success: false,
        },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        {
          message: "No file uploaded",
          success: false,
        },
        { status: 400 }
      );
    }
    //dont allow files other than images
    if(!file.type.includes("image")){
        return NextResponse.json(
            {
              message: "Only images are allowed",
              success: false,
            },
            { status: 400 }
          );
    }

    //check for file size

    if (file.size > 1024 * 1024 * 10) {
      return NextResponse.json(
        {
          message: "File size should be less than 10MB",
          success: false,
        },
        { status: 400 }
      );
    }

    //check for valid apiKey

    const user = await prisma.user.findUnique({
      where: {
        apiKey: apiKey,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid API Key",
          success: false,
        },
        { status: 401 }
      );
    }
    const telegramRes = await uploadFileToTelegram(file);
    console.log(telegramRes?.result?.photo.at(-1));
    if (!telegramRes.ok) {
      return NextResponse.json(
        {
          message: "Error uploading file",
          success: false,
        },
        { status: 500 }
      );
    }

    const folder = formData.get("folder") as string;

    if (!folder) {
        console.log("folder not found");
      const uploadedFile = await prisma.file.create({
        data: {
          name: file.name + Math.floor(Math.random() * 1000),
          file_id: telegramRes.result.photo.at(-1).file_id,
          type: file.type,
          size: telegramRes.result.photo.at(-1).file_size,
          url:
            process.env.BACKEND_URL +
            "/file/" +
            telegramRes.result.photo.at(-1).file_id,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return NextResponse.json({
        success: true,
        message: "File uploaded successfully",
        data: {
          file_name: uploadedFile.name,
          file_id: uploadedFile.file_id,
          file_type: uploadedFile.type,
          url: uploadedFile.url,
        },
      });
    }

    let folderExists = await prisma.folder.findUnique({
      where: {
        name_userId: {
          name: folder,
          userId: user.id,
        },
      },
    });
    if (!folderExists) {
      folderExists = await prisma.folder.create({
        data: {
          name: folder,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }

    const uploadedFile = await prisma.file.create({
      data: {
        name: file.name + Math.floor(Math.random() * 1000),
        file_id: telegramRes.result.photo.at(-1).file_id,
        type: file.type,
        size: telegramRes.result.photo.at(-1).file_size,
        url:
          process.env.BACKEND_URL +
          "/file/" +
          telegramRes.result.photo.at(-1).file_id,
        user: {
          connect: {
            id: user.id,
          },
        },
        folder: {
          connect: {
            id: folderExists.id,
          },
        },
      },
    });
    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      data: {
        file_name: uploadedFile.name,
        file_id: uploadedFile.file_id,
        file_type: uploadedFile.type,
        url: uploadedFile.url,
      },
    });
  } catch (error) {
    console.log(error.stack);
    if (
      error?.message ===
      `Content-Type was not one of "multipart/form-data" or "application/x-www-form-urlencoded".`
    ) {
      return NextResponse.json(
        {
          message: "Invalid content type",
          success: false,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Error uploading file", success: false },
      { status: 500 }
    );
  }
}
