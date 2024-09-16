import './movie.css';
import Link from 'next/link';
import { deleteCardFilm, addMovieFav } from '@/actions/cards-action';
import { auth } from "@/configs/auth";
import { db } from "@/lib/db";
import { Trash, Heart } from 'lucide-react';
import Image from 'next/image';

const MoviesCard = async ({ card }: any) => {
  const session = await auth();
  const isMovieFav = await db.favorite.findFirst({
    where: {
      userId: session?.user.id,
      filmId: card.id
    }
  })

  const isFavorite = isMovieFav ? true : false;

  return (
    <li
      className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
      <Link href={card.link} target='_blank'>
        <div className="overflow-hidden rounded-t-lg aspect-w-16 aspect-h-9 h-44">
          <img
            // width={100}
            // height={100}
            // layout="responsive"
            className="rounded-t-lg object-cover h-full w-full"
            src={card.link}
            alt={card.title} />
        </div>

      </Link>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight">{card.title}</h5>
        <p className="mb-4 text-base">
          This is a wider card with supporting text below as a natural
          lead-in to additional content. This content is a little bit
          longer.
        </p>
      </div>
      <div
        className="mt-auto flex justify-between border-t-2 border-neutral-100 px-6 py-3 text-center text-surface/75 dark:border-white/10 dark:text-neutral-300">
        <small>Длительность: {card.duration}м</small>
        <div className='flex gap-2'>
          {session?.user.role === 'admin' &&
            <form action={deleteCardFilm}>
              <button type="submit" className='bg-transparent'><Trash color="grey" /></button>
              <input type="hidden" name='id' value={card.id} />
            </form>}
          <form action={addMovieFav}>
            <button type="submit" className={isFavorite ? 'text-white rounded-full' : ''}><Heart size={20} /></button>
            <input type="hidden" name='id' value={card.id} />
          </form>


          <button
            type="button"
            className="relative inline-block focus:outline-none"
          >
            <Heart
              className={isFavorite ? `text-red-500` : `text-gray-500` }
            fill="currentColor"
            width={24}
            height={24} 
  />
            {isFavorite &&
              <div className="absolute inset-0 rounded-full bg-black/50 transition-opacity duration-300"></div>
            }
          </button>



        </div>
      </div>
    </li>






    // <li className="movie">
    //   <figure className="movies__element">
    //     <Link href={card.link} target='_blank'>
    //     <Image
    //     width={100}
    //     height={100}
    //     layout='responsive'
    //       className="movies-card-image"
    //       src={card.image}
    //       alt={`Картинка превью фильма: ${card.title}`}
    //     />
    //     </Link>

    //     <figcaption className="movies__card">
    //       <p className="movies__card-name">{card.title}</p>
    //       {session?.user.role === 'admin' &&
    //       <form action={deleteCardFilm}>
    //         <button type="submit" className='bg-transparent'><Trash  color="#e63333"/></button>
    //         <input type="hidden" name='id' value={card.id} />
    //       </form>}

    //       <form action={addMovieFav}>
    //         <button type="submit" className={isFavorite ? 'isfavorite bg-transparent' : ''}><Heart size={20} /></button>
    //         <input type="hidden" name='id' value={card.id} />
    //       </form>

    //     </figcaption>
    //     <p className="movie__duration">{card.duration}</p>
    //   </figure>
    // </li>
  );
};
export default MoviesCard;
