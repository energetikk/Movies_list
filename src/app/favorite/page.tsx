
import MoviesCardFav from '@/components/Movies/MovieCard/cardMovieFav';
import { getMoviesFav } from '@/actions/auth-actions';

export default async function MoviesFavoriteList() {
  const moviesFav = await getMoviesFav()
  
  console.log(moviesFav)

  return (
    <>
      <section className="movies-cards-list">
      {Array.isArray(moviesFav) && moviesFav.length === 0 && (
          <p className='text-red-500 w-1/2'>В избранное еще не добавлены фильмы. Перейдите в раздел с фильмами и нажмите сохранить понравившийся фильм что бы не потерять.</p>)}
        <ul className="movies__preview-list">
          {Array.isArray(moviesFav) && moviesFav.map((card) => (
            <MoviesCardFav key={card.film.id} card={card} id={card.film.id} />
          ))}
        </ul>
      </section>
    </>
  );
};
