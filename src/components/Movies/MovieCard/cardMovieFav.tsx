import './movie.css';
import Link from 'next/link';
import { removeMovieFav } from '@/actions/cards-action';
import { auth } from "@/configs/auth";
import { X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const MoviesCardFav = async ({ card }: any) => {
  const session = await auth();

  return (
    <li className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
      <Link href={card.film.link} target='_blank'>
        <div className="overflow-hidden rounded-t-lg aspect-w-16 aspect-h-9 h-44">
          <img
            className="rounded-t-lg object-cover h-full w-full"
            src={card.film.image}
            alt={`Картинка превью фильма: ${card.film.title}`}
          />
        </div>
      </Link>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight">{card.title}</h5>
        <p className="mb-4 text-base">
          {card.film.description}
        </p>
      </div>
      <div
        className="mt-auto flex justify-between border-t-2 border-neutral-100 px-6 py-3 text-center text-surface/75 dark:border-white/10 dark:text-neutral-300">
        <small>Длительность: {card.film.duration}м</small>
        <div className='flex gap-4'>
          <form action={removeMovieFav}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                <button type="submit" className='bg-transparent'><X size={22} color='red' /></button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Удалить из избранного</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            

            <input type="hidden" name='id' value={card.id} />
          </form>
        </div>
      </div>
    </li>
  );
};
export default MoviesCardFav;
