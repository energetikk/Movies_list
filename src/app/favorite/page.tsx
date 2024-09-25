
import MoviesCardFav from '@/components/Movies/MovieCard/cardMovieFav';
import { getMoviesFav } from '@/actions/cards-action';

export default async function MoviesFavoriteList() {
  const moviesFav = await getMoviesFav()
  
  return (
      <section className="">
      {Array.isArray(moviesFav) && moviesFav.length === 0 && (
          <p className='text-red-500 w-2/3 pt-10 mx-auto'>В избранное еще не добавлены фильмы. Перейдите в раздел с фильмами и нажмите сохранить понравившийся фильм что бы не потерять.</p>)}
        <ul className="pt-10 grid-cols-2 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {Array.isArray(moviesFav) && moviesFav.map((card) => (
            <MoviesCardFav key={card.film.id} card={card} id={card.film.id} />
          ))}
        </ul>
      </section>
  );
};
