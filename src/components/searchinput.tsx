'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchInput = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('query', searchTerm)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col items-center">
      {/* <h2 className='mb-2'>Поиск по базе фильмов:</h2> */}
      {/* <div className="relative flex flex-1 flex-shrink-0"> */}
      <div className="relative">
        <label htmlFor="serch" className="sr-only">Поиск по базе фильмов:</label>
        <Input onChange={(e) => { handleSearch(e.target.value) }} type="text" placeholder="Поиск..." className="peer block w-72 sm:w-96 py-[9px] pl-10 rounded-md border border-grey-200" />
        <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-fo:text-gray-800" />
      </div>

    </div>
  )
}

export default SearchInput;
