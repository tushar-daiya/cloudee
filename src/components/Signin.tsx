"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Github } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { signInSchema } from "@/schema/zod";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: (ctx) => {
          toast.success("Signed in successfully");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  }
  async function onGithub() {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  }
  return (
    <div>
      <div className="max-w-xl mx-auto flex flex-col justify-center h-full">
        <h1 className="text-4xl font-bold text-primary">Sign in</h1>
        <p className="mt-3 text-muted-foreground">
          Sign in to your account to access your files.
        </p>
        <div className="mt-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mx-auto py-10"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-14"
                        placeholder="Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-14"
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={form.formState.isSubmitting}
                className="w-full h-14 text-lg"
                type="submit"
              >
                {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>

          <hr />
          <div className="w-full flex justify-center mt-5">
            <Button
              onClick={onGithub}
              variant={"outline"}
              className="h-14 text-lg font-bold"
            >
              <Github /> Sign in with Github
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
