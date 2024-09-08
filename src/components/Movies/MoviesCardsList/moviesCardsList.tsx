import './movieslist.css';
// import { baseFilms } from '@/utils/users';
import MoviesCard from '../MovieCard/cardMovie';
import { db } from '@/lib/db';

const MoviesCardList = async () => {

 // const allFilms= await db.film.findMany({
  //   where: {
  //     title: data.email,
  //   },
  //   include: {
  //     accounts: true, 
  //   },
  const allFilms = await db.film.findMany({
    // where: {
    //   title: {
    //     contains: 'per'
    //   }
    // },
    // orderBy: {
    //   createdAt: 'desc'
    // }

  })
 
  // console.log('список фильмов', allFilms)

  return (
    <>
      <section className="movies-cards-list">
        <ul className="movies__preview-list">
          {allFilms.map((card) => (
            
            <MoviesCard key={card.id} card={card} id={card.id} />
            
          ))}
        </ul>
      </section>
    </>
  );
};

export default MoviesCardList;
