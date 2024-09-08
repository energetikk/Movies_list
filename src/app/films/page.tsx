import MoviesCardList from '@/components//Movies/MoviesCardsList/moviesCardsList';
import  SearchForm  from '@/components/SearchForm/SearchForm';
import { searchFilms } from '@/actions/auth-actions';

export default function Films() {
  
  return (
    <>
      <SearchForm />
      <MoviesCardList />
    </>
  )
}

