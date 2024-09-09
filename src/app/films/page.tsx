import MoviesCardList from '@/components//Movies/MoviesCardsList/moviesCardsList';
// import  SearchForm  from '@/components/SearchForm/SearchForm';
import SearchInput from '@/components/searchinput';
import { searchFilms } from '@/actions/auth-actions';

export default function Films({ searchParams } : { searchParams?: { query?: string}}) {

const query = searchParams?.query || '';
  return (
    <div>
      <h2>Поиск по базе фильмов:</h2>
      <SearchInput />
      <MoviesCardList query={query}/>
    </div>
  )
}

