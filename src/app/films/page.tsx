import MoviesCardList from '@/components//Movies/MoviesCardsList/moviesCardsList';
import SearchInput from '@/components/searchinput';

export default function Films({ searchParams } : { searchParams?: { query?: string}}) {

const query = searchParams?.query || '';
  return (
    <div className='mt-10'>
      <h2 className='mb-2'>Поиск по базе фильмов:</h2>
      <SearchInput />
      <MoviesCardList query={query}/>
    </div>
  )
}

