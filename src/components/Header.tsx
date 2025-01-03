"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Header() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();
  return (
    <nav className="w-full p-5">
      <div className="max-w-6xl mx-auto border shadow-lg rounded-lg p-5 bg-background">
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-bold text-primary">Cloudee</p>
          {!isPending && session ? (
            <Button variant={"outline"} asChild>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
          ) : (
            <Button variant={"outline"} asChild>
              <Link href={"/auth"}>Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
