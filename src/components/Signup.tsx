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
import { signupSchema } from "@/schema/zod";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    await authClient.signUp.email(
      {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: (ctx) => {
          toast.success("Account created successfully");
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
        <h1 className="text-4xl font-bold text-primary">Sign up</h1>
        <p className="mt-3 text-muted-foreground">
          Create new account and get unlimted storage.
        </p>
        <div className="mt-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mx-auto py-10"
            >
              <div className="flex gap-2 w-full">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          className="h-14"
                          placeholder="First Name"
                          type="text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          className="h-14 w-full"
                          placeholder="Last Name"
                          type="text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                {form.formState.isSubmitting ? "Signing up..." : "Sign up"}
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
              <Github /> Sign up with Github
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
