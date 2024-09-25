'use client'

import { changedAvatar } from '@/actions/user-actions';
import { z } from 'zod';
import { formAvatar } from "@/lib/zod";
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
import { useSession } from 'next-auth/react';

export default function FormAddAvatar() {
  
  const {data: session, update} = useSession();
  async function updateSession(newImageUrl: string) {
    await update({
      ...session,
      user: {
 ...session?.user,
        image: newImageUrl
      },
    })
  }

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formAvatar>>({
    resolver: zodResolver(formAvatar),
    defaultValues: {
      image: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formAvatar>) {
    setError(null);
    startTransition(async () => {
      const response = await changedAvatar(values);
      if (response && response.error) {
        setError(response.error);
        
      } else {
        await updateSession(values.image);
        form.reset();
        router.push("/profile");
        router.refresh()
      }
    });
  }

 return (
    <div>
      <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col w-72 mx-auto">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ссылка на аватар:</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Вставьте ссылку на изображение..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>Изменить</Button>
              </form>
            </Form>
      </div>
    )
  }
