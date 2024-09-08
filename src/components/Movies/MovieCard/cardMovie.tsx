// 'use client'

import './movie.css';
// import Image from "next/image";
import Link from 'next/link';
import {deleteCardFilm} from '@/actions/auth-actions';
import { auth } from "@/configs/auth";

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
            <button type="submit" className="w-5 h-5 border-1 rounded-full">D</button>
            <input type="hidden" name='id' value={card.id} />
          </form>}
        </figcaption>
        <p className="movie__duration">{card.duration}</p>
      </figure>
    </li>
  );
};

export default MoviesCard;
