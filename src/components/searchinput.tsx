 'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
   <div className="border rounded-lg w-1/4 flex items-center justify-center">
    <Input onChange={(e) => {handleSearch(e.target.value)}} type="text" placeholder="Поиск..." className="border-none" />
    <Button variant="ghost" size="icon">
        <Search />
        <span className="sr-only">Search Button</span>
    </Button>
   </div>
  )
}

export default SearchInput;
