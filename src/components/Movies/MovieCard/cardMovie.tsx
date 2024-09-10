import './movie.css';
import Link from 'next/link';
import { deleteCardFilm, getMoviesFav, addMovieFav } from '@/actions/auth-actions';
import { auth } from "@/configs/auth";
import { db } from "@/lib/db";
import { Trash, Heart } from 'lucide-react';

const MoviesCard = async ({ card }:any) => {
  const session = await auth();
  const isMovieFav = await db.favorite.findFirst({
    where: {
      userId: session?.user.id,
      filmId: card.id
    }
  })

  const isFavorite = isMovieFav ? true : false;

 // Переменная для отображения статуса фильма в избранном
//  const isFavorite = isMovieFav ? true : false;

//  // Функция для добавления или удаления фильма из избранного
//  const handleToggleFavorite = async () => {
//    if (isFavorite) {
//      await toggleFavoriteFilm(session?.user.id, card.id, 'remove'); // Удаляем из избранного
//    } else {
//      await toggleFavoriteFilm(session?.user.id, card.id, 'add'); // Добавляем в избранное
//    }
   
//    // Обновляем статус isFavorite после изменения в базе данных
//    const updatedIsMovieFav = await db.favorite.findFirst({
//      where: {
//        userId: session?.user.id,
//        filmId: card.id
//      }
//    });

//    // Обновляем статус isFavorite с учетом изменений в базе данных
//    setIsFavorite(updatedIsMovieFav ? true : false);
//  };


// const [isFavorite, setIsFavorite] = useState(false); // Состояние для отображения статуса фильма в избранном

// // Функция для добавления или удаления фильма из избранного
// const toggleFavoriteFilm = async (userId, filmId, action) => {
//   // Реализация добавления и удаления фильма из избранного в базе данных
//   // Например, вызов API для отправки запроса на сервер
// };

// const handleToggleFavorite = async () => {
//   if (isFavorite) {
//     await toggleFavoriteFilm(session?.user.id, card.id, 'remove'); // Удаляем из избранного
//   } else {
//     await toggleFavoriteFilm(session?.user.id, card.id, 'add'); // Добавляем в избранное
//   }
  
//   // Обновляем статус isFavorite после изменения в базе данных
//   const updatedIsMovieFav = await db.favorite.findFirst({
//     where: {
//       userId: session?.user.id,
//       filmId: card.id
//     }
//   });

//   // Обновляем статус isFavorite с учетом изменений в базе данных
//   setIsFavorite(updatedIsMovieFav ? true : false);
// };



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
          

          <form action={addMovieFav}>
            <button type="submit" className={isFavorite ? 'isfavorite bg-transparent' : ''}><Heart size={20} /></button>
            <input type="hidden" name='id' value={card.id} />
          </form>
            

        </figcaption>
        <p className="movie__duration">{card.duration}</p>
      </figure>
    </li>
  );
};
export default MoviesCard;
