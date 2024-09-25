"use server";

import { db } from "@/lib/db";
import { formAvatar } from "@/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";
import { auth } from "@/configs/auth";
import { revalidatePath } from "next/cache";

export const changedAvatar = async (values: z.infer<typeof formAvatar>) => {
    const session = await auth();
    try {
      const { data, success } = formAvatar.safeParse(values);
      if (!success) {
        return {
          error: "Invalid data",
        };
      }
  
      await db.user.update({
        where: {
            id: session?.user.id,
          },
          data: {
            image: values.image,
          },
      }
    )
    
    revalidatePath('/profile');
  
    } catch (error) {
      if (error instanceof AuthError) {
        return { error: error.cause?.err?.message };
      }
      return { error: "error 500" };
    }
  };