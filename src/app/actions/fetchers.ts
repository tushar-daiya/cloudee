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
