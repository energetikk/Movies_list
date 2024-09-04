"use client"

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaRegister } from "@/lib/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
// import { loginAction } from "@/actions/auth-actions";
import { registerAction } from "@/actions/auth-actions";


export default function FormLogin() {

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaRegister>>({
    resolver: zodResolver(formSchemaRegister),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  // async function onSubmit(values: z.infer<typeof formSchemaRegister>) {
  // setError(null);
  // startTransition(async () => {
  //     console.log(values)
  // //   const response = await registerAction(values);
  //   if (response.error) {
  //     setError(response.error);
  //   } else {
  //     router.push("/dashboard");
  //   }
  // });
  // }

  async function onSubmit(values: z.infer<typeof formSchemaRegister>) {
    console.log(values)
    setError(null);
    startTransition(async () => {
      const response = await registerAction(values);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/");
      }
    });
  }



  return (
    <div className="flex mx-auto h-screen items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col w-96 ">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя:</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Имя..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail:</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="E-mail..." {...field} />
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
                <FormLabel>Пароль:</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>

    </div>
  )
}