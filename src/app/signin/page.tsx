"use client"

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaLogin } from "@/lib/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/actions/auth-actions";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function FormLogin() {

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    console.log(values)
    setError(null);
    startTransition(async () => {
      const response = await loginAction(values);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/films");
        router.refresh()
      }
    });
  }

  return (
    <div className="flex mx-auto h-screen flex-col items-center justify-center">
      <h2>Войдите в аккаунт...</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col w-96 ">
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
          <Button type="submit" disabled={isPending}>Войти</Button>
          <div className="flex gap-5">
            <p>Нет учетной записи?</p>
            <span>
                <Link href="/signup">Зарегестрироваться</Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  )
}