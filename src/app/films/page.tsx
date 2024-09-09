import MoviesCardList from '@/components//Movies/MoviesCardsList/moviesCardsList';
import SearchInput from '@/components/searchinput';

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

