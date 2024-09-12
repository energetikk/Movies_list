import MoviesCardList from '@/components//Movies/MoviesCardsList/moviesCardsList';
import SearchInput from '@/components/searchinput';

export default function Films({ searchParams } : { searchParams?: { query?: string}}) {

const query = searchParams?.query || '';
  return (
    <div className='mt-10'>
      <SearchInput />
      <MoviesCardList query={query}/>
    </div>
  )
}

