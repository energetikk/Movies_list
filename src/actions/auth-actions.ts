
"use server";

import { signIn } from "@/configs/auth";
import { db } from "@/lib/db";
import { formSchemaLogin, formSchemaRegister, formSchemaAddFilm } from "@/lib/zod";
import bcrypt from "bcryptjs";
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

// export async function createCardFilm(formData: FormData) {
// export async function createCardFilm(values: z.infer<typeof formSchemaAddFilm>) {
//   const session = await auth();
//   await db.film.create({
//     data: {
//       // title: values.get('title') as string,
//       // image: values.get('image') as string,
//       // link: values.get('link') as string,
//       // duration: values.get('duration') as string,
//       title: values.title,
//       image: values.image,
//       link: values.link,
//       duration: values.duration,
//       authorId: session?.user.id as string
//     }
//   })
//   revalidatePath('/films');
// }
export async function createCardFilm(values: z.infer<typeof formSchemaAddFilm>) {
  try {
    const session = await auth();
    await db.film.create({
      data: {
        title: values.title,
        image: values.image,
        link: values.link,
        duration: values.duration,
        authorId: session?.user.id as string
      }
    });
    revalidatePath('/films');
  } catch (error) {
    console.error('An error occurred while creating the film card:', error);
    return { error: 'An error occurred while creating the film card' };
  }
}

export async function deleteCardFilm(formData: FormData) {
  const idfilm = formData.get('id') as string

  try {
    // Удаляем запись о фильме из таблицы избранного, если она есть
    await db.favorite.deleteMany({
      where: {
        filmId: idfilm,
      },
    });

    // Удаление фильма из таблицы film
    const deleteFilm = await db.film.delete({
      where: {
        id: idfilm,
      },
    })
    revalidatePath('/films');

    return deleteFilm;
  } catch (error) {
    // Обработка ошибки
    console.error('Error deleting film:', error);
    return null;
  }
}

export async function getMovies() {
  const getFilms = await db.film.findMany({},
 )
  return getFilms;
}

export async function searchFilms(values: string | number) {
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
  return foundFilms;
}

export async function getMoviesFav() {
  const session = await auth();
  console.log(session)
  
  if (!session) return false;
  const listmoviefav = await db.favorite.findMany({
    where: {
      userId: session.user.id
    },
    select: {
      film: true
    }
  })
  // revalidatePath('/favorite');
  console.log(listmoviefav)
  
  return listmoviefav;
}

export async function addMovieFav(formData: FormData) {
  const session = await auth();
  const idfilm = formData.get('id');

  const isFavorite = await db.favorite.findFirst({
    where: {
      userId: session?.user.id as string, // ID пользователя из сессии
      filmId: idfilm as string// ID фильма, который нужно добавить в избранное (передается в теле запроса)
    }
  })

    if (isFavorite) {
      // Если фильм уже в избранном - удаляем его
      await db.favorite.delete({
        where: { id: isFavorite.id }
      })
      revalidatePath('/films');
      console.log('Movie removed from favorites:', idfilm);
    } else {
      // Если фильма нет в избранном - добавляем его
      await db.favorite.create({
        data: {
          userId: session?.user.id as string, // ID пользователя из сессии
          filmId: idfilm as string// ID фильма, который нужно добавить в избранное (передается в теле запроса)
        },
      })
      revalidatePath('/films');
    }
}





