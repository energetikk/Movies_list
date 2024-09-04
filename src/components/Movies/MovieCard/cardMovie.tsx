import './movie.css';
import Image from "next/image";
const BASE_URL = 'https://api.nomoreparties.co';
const MoviesCard = ({ card }) => {
  return (
    <li className="movie">
      <figure className="movies__element">
        <img
          className="movies-card-image"
          
          src={`${BASE_URL}${card.image.url}`}
          alt={`Картинка превью фильма: ${card.nameRU}`}
        />
        <figcaption className="movies__card">
          <p className="movies__card-name">{card.nameRU}</p>
        </figcaption>
        <p className="movie__duration">{card.duration}</p>
      </figure>
    </li>
  );
};

export default MoviesCard;