import './movie.css';
import Link from 'next/link';
import { removeMovieFav } from '@/actions/auth-actions';
import { auth } from "@/configs/auth";
import { db } from "@/lib/db";
import { Heart } from 'lucide-react';
import Image from 'next/image';

const MoviesCardFav = async ({ card }:any) => {
  const session = await auth();
  const isMovieFav = await db.favorite.findFirst({
    where: {
      userId: session?.user.id,
      filmId: card.id
    }
  })

  return (
    <li className="movie">
      <figure className="movies__element">
        <Link href={card.film.link} target='_blank'>
        <img
          className="movies-card-image"
          src={card.film.image}
          // width={200}
          // height={140}
          alt={`Картинка превью фильма: ${card.title}`}
        />
        </Link>
        <figcaption className="movies__card">
          <p className="movies__card-name">{card.title}</p>
          <form action={removeMovieFav}>
            <button type="submit" className='isfavorite bg-transparent'><Heart size={20} /></button>
            <input type="hidden" name='id' value={card.id} />
          </form>
        </figcaption>
        <p className="movie__duration">{card.duration}</p>
      </figure>
    </li>
  );
};
export default MoviesCardFav;
