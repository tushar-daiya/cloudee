"use server";
import { generateApiKey } from "@/lib/apiKey";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const createApiKey = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    redirect("/auth");
  }
  //check if session.user contains apikey
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      apiKey: true,
    },
  });

  if (user?.apiKey) {
    return { success: false, data: "User already has an API key" };
  }

  const apiKey = await generateApiKey();

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      apiKey,
    },
  });
  revalidatePath("/dashboard/api-keys");
  return { success: true, data: apiKey };
};

export const deleteApiKey = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    redirect("/auth");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      apiKey: true,
    },
  });

  if (!user?.apiKey) {
    return { success: false, data: "User does not have an API key" };
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      apiKey: null,
    },
  });
  revalidatePath("/dashboard/api-keys");
  return { success: true };
};
