"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getApiKeys = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    redirect("/auth");
  }

  const apiKey = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      apiKey: true,
    },
  });

  return { success: true, data: apiKey };
};

export interface File {
  id: number;
  name: string;
  file_id: string;
  type: string;
  size: number;
  userId: string;
  folderId: number | null;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Folder {
  id: number;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getFilesandFolders = async (page: number = 1) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/auth");
  }

  const PAGE_SIZE = 10;
  const skip = (page - 1) * PAGE_SIZE;

  const totalFolders = await prisma.folder.count({
    where: {
      userId: session.user.id,
    },
  });

  const totalFiles = await prisma.file.count({
    where: {
      userId: session.user.id,
      folderId: null,
    },
  });

  const folders =
    skip > totalFolders
      ? []
      : await prisma.folder.findMany({
          where: {
            userId: session.user.id,
          },
          skip,
          take: PAGE_SIZE,
        });

  const files =
    PAGE_SIZE - folders.length > 0
      ? await prisma.file.findMany({
          where: {
            userId: session.user.id,
            folderId: null,
          },
          take: PAGE_SIZE - folders.length,
          skip: skip > totalFolders ? skip - totalFolders : 0,
        })
      : [];

  return {
    success: true,
    data: {
      folders,
      files,
      totalPages: Math.ceil((totalFolders + totalFiles) / PAGE_SIZE),
    },
  };
};
