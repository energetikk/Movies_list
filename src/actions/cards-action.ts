"use server";

import { db } from "@/lib/db";
import { formSchemaAddFilm } from "@/lib/zod";
import { z } from "zod";
import { auth } from "@/configs/auth";
import { revalidatePath } from "next/cache";

export async function createCardFilm(values: z.infer<typeof formSchemaAddFilm>) {
    try {
      const session = await auth();
      await db.film.create({
        data: {
          title: values.title,
          image: values.image,
          link: values.link,
          description: values.description,
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
      console.error('Error deleting film:', error);
      return null;
    }
  }
  
  export async function getMovies() {
    const getFilms = await db.film.findMany({})
    console.log(getFilms)
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
    console.log(session);
    
    if (!session) return false;
    
     const filmsFavorites = await db.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
            film: true,
          },
    });
    return filmsFavorites;
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
  
  export async function removeMovieFav(formData: FormData) {
    const idfilm = formData.get('id') as string
    await db.favorite.delete({
      where: {
        id: idfilm 
      }
    })
    revalidatePath('/favorite');
  }

