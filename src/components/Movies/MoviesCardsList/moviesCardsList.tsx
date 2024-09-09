import './movieslist.css';
// import { baseFilms } from '@/utils/users';
import MoviesCard from '../MovieCard/cardMovie';
import { db } from '@/lib/db';
import { searchFilm, getMovies } from '@/actions/auth-actions'

const MoviesCardList = async ({query}:{query: string}) => {
// const findmovie = await searchFilms(query)
const findmovie = await getMovies()
  // const allFilms = await db.film.findMany({})
 
 const filteredmovies = Array.isArray(findmovie) ? findmovie.filter((movie) => {
  return movie.title.toLowerCase().includes(query.toLowerCase());
 }) : [];

  return (
    <>
      <section className="movies-cards-list">
        {Array.isArray(findmovie) && filteredmovies.length === 0 &&
          <p className='text-red-500'>По вашему запросу ничего не найдено!</p>
        }
        <ul className="movies__preview-list">
          {filteredmovies.map((card) => (
            <MoviesCard key={card.id} card={card} id={card.id} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default MoviesCardList;
