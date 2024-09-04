import './movieslist.css';
import { baseFilms } from '@/utils/users';
import MoviesCard from '../MovieCard/cardMovie';

const MoviesCardList = () => {
//   const newarr = baseFilms.map((el) => {
//     let obj;
//     const { title, ...rest } = el;
//     return (obj = { ...el, ...rest });
//   });

  return (
    <>
      <section className="movies-cards-list">
        <ul className="movies__preview-list">
          {baseFilms.map((card) => (
            <MoviesCard key={card.id} card={card} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default MoviesCardList;
