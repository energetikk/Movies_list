import './movieslist.css';
import MoviesCard from '../MovieCard/cardMovie';
import { getMovies } from '@/actions/auth-actions'

const MoviesCardList = async ({query}:{query: string}) => {
const findmovie = await getMovies()
 
 const filteredmovies = Array.isArray(findmovie) ? findmovie.filter((movie) => {
  return movie.title.toLowerCase().includes(query.toLowerCase());
 }) : [];

  return (
    <>
      <section className="movies-cards-list">
        {Array.isArray(findmovie) && filteredmovies.length === 0 && (
          <p className='text-red-500'>По вашему запросу ничего не найдено!</p>)}
        <ul className="movies__preview-list">
          {Array.isArray(findmovie) && filteredmovies.map((card) => (
            <MoviesCard key={card.id} card={card} id={card.id} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default MoviesCardList;
