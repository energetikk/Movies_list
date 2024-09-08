
"use server";

import { signIn } from "@/configs/auth";
import { db } from "@/lib/db";
import { formSchemaLogin, formSchemaRegister } from "@/lib/zod";
import bcrypt from "bcryptjs";
import { User } from "lucide-react";
import { AuthError } from "next-auth";
import { z } from "zod";
import { auth } from "@/configs/auth";
import { revalidatePath } from "next/cache";

export const loginAction = async (values: z.infer<typeof formSchemaLogin>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: '/',
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};

export const registerAction = async (
  values: z.infer<typeof formSchemaRegister>
) => {
  try {
    const { data, success } = formSchemaRegister.safeParse(values);
    if (!success) {
      return {
        error: "Invalid data",
      };
    }
    
    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        accounts: true, 
      },
    });

    if (user) {
      const oauthAccounts = user.accounts.filter(
        (account) => account.type === "oauth"
      );
      if (oauthAccounts.length > 0) {
        return {
          error:
            "To confirm your identity, sign in with the same account you used originally.",
        };
      }
      return {
        error: "User already exists",
      };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    await db.user.create({
      data: {
        email: data.email,
        name: data.username,
        password: passwordHash,
      },
    });

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      redirectTo: '/',
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};

export async function createCardFilm(formData: FormData) {
  const session = await auth();
  await db.film.create({
    data: {
      title: formData.get('title') as string,
      image: formData.get('image') as string,
      link: formData.get('link') as string,
      duration: formData.get('duration') as string,
      authorId: session?.user.id as string
    }
  })
}

export async function deleteCardFilm(formData: FormData, id: String) {
  const idfilm = formData.get('id') as string
  const deleteFilm = await db.film.delete({
    where: {
      id: idfilm
    },
  })
  revalidatePath('/films');
}

export async function searchFilms(values: FormData) {
  const foundFilms = await db.film.findMany({
    where: {
        title: {
          contains: `${values}`
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
  })
  
  revalidatePath('/films');
  // console.log(foundFilms)
  return foundFilms;
}


