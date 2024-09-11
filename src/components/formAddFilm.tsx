'use client'

import { createCardFilm } from '@/actions/auth-actions';
import { z } from 'zod';
import { formSchemaAddFilm } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function FormAddFilm() {

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaAddFilm>>({
    resolver: zodResolver(formSchemaAddFilm),
    defaultValues: {
      title: "",
      image: "",
      link: "",
      duration: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchemaAddFilm>) {
    setError(null);
    startTransition(async () => {
      const response = await createCardFilm(values);
      if (response && response.error) {
        setError(response.error);
      } else {
        form.reset();
        router.push("/admin");
        router.refresh()
      }
    });
  }

 return (
    <div>
      <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col w-96 ">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название фильма</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Название фильма..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ссылка на постер фильма:</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Вставьте ссылку на постер фильма..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ссылка на фильм:</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Вставьте ссылку на фильм..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Длительность фильма в минутах</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Укажите длительность в минутах..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>Submit</Button>
              </form>
            </Form>
      </div>
    )
  }
