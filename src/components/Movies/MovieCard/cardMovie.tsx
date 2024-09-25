import './movie.css';
import Link from 'next/link';
import { deleteCardFilm, addMovieFav } from '@/actions/cards-action';
import { auth } from "@/configs/auth";
import { db } from "@/lib/db";
import { Trash, Heart } from 'lucide-react';

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
            src={card.image}
            alt={card.title} />
        </div>

      </Link>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight">{card.title}</h5>
        <p className="mb-4 text-base">
          {card.description}
        </p>
      </div>
      <div
        className="mt-auto flex justify-between border-t-2 border-neutral-100 px-6 py-3 text-center text-surface/75 dark:border-white/10 dark:text-neutral-300">
        <small>Длительность: {card.duration}м</small>
        <div className='flex gap-4'>
          {session?.user.role === 'admin' &&
            <form action={deleteCardFilm}>
              <button type="submit" className='bg-transparent'><Trash color="black" /></button>
              <input type="hidden" name='id' value={card.id} />
            </form>}
          <form action={addMovieFav}>
            <button type="submit" className='bg-transparent'><Heart size={24} className='' stroke-width='2' fill={isFavorite ? 'red' : 'currentColor'} stroke={isFavorite ? 'red' : 'black'} /></button>
            <input type="hidden" name='id' value={card.id} />
          </form>
        </div>
      </div>
    </li>
  );
};
export default MoviesCard;
