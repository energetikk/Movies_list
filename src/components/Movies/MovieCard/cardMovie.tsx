import './movie.css';
// import Image from "next/image";
import Link from 'next/link';
import { deleteCardFilm, getMoviesFav } from '@/actions/auth-actions';
import { auth } from "@/configs/auth";
import { Trash, Heart } from 'lucide-react';

const MoviesCard = async ({ card }:any) => {
  const session = await auth();


  
  return (
    <li className="movie">
      <figure className="movies__element">
        <Link href={card.link} target='_blank'>
        <img
          className="movies-card-image"
          src={card.image}
          // width={200}
          // height={140}
          alt={`Картинка превью фильма: ${card.title}`}
        />
        </Link>
        
        <figcaption className="movies__card">
          <p className="movies__card-name">{card.title}</p>
          {session?.user.role === 'admin' &&
          <form action={deleteCardFilm}>
            <button type="submit" className='bg-transparent'><Trash  color="#e63333"/></button>
            <input type="hidden" name='id' value={card.id} />
          </form>}
          

          <form action={getMoviesFav}>
            <button type="submit" className='bg-transparent'><Heart size={20} /></button>
            <input type="hidden" name='id' value={card.id} />
          </form>

            
        </figcaption>
        <p className="movie__duration">{card.duration}</p>
      </figure>
    </li>
  );
};
export default MoviesCard;
