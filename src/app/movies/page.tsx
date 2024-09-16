import Image from "next/image";
import { getMovies } from '@/actions/cards-action';



export default async function Movies() {
    const findmovie = await getMovies();

    return (
        <div className="grid-cols-1 sm:grid md:grid-cols-3 ">
  <div
    className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
    <a href="#!">
      <Image
        width={100}
        height={100}
        layout="responsive"
        className="rounded-t-lg"
        src={"https://tecdn.b-cdn.net/img/new/standard/city/044.webp"}
        alt="Skyscrapers" />
    </a>
    <div className="p-6">
      <h5 className="mb-2 text-xl font-medium leading-tight">Card title</h5>
      <p className="mb-4 text-base">
        This is a wider card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
      </p>
    </div>
    <div
      className="mt-auto border-t-2 border-neutral-100 px-6 py-3 text-center text-surface/75 dark:border-white/10 dark:text-neutral-300">
      <small>Last updated 3 mins ago</small>
    </div>
  </div>

  <div
    className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
    <a href="#!">
      <img
        className="rounded-t-lg"
        src="https://tecdn.b-cdn.net/img/new/standard/city/043.webp"
        alt="Los Angeles Skyscrapers" />
    </a>
    <div className="p-6">
      <h5 className="mb-2 text-xl font-medium leading-tight">Card title</h5>
      <p className="mb-4 text-base">
        This card has supporting text below as a natural lead-in to
        additional content.This card has supporting text below as a natural lead-in to
        additional content.This card has supporting text below as a natural lead-in to
        additional content.This card has supporting text below as a natural lead-in to
        additional content.This card has supporting text below as a natural lead-in to
        additional content.This card has supporting text below as a natural lead-in to
        additional content.
      </p>
    </div>
    <div
      className="mt-auto border-t-2 border-neutral-100 px-6 py-3 text-center text-surface/75 dark:border-white/10 dark:text-neutral-300">
      <small>Last updated 3 mins ago</small>
    </div>
  </div>

  <div
    className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
    <a href="#!">
      <img
        className="rounded-t-lg"
        src="https://tecdn.b-cdn.net/img/new/standard/city/042.webp"
        alt="Palm Springs Road" />
    </a>
    <div className="p-6">
      <h5 className="mb-2 text-xl font-medium leading-tight">Card title</h5>
      <p className="mb-4 text-base">
        This is a wider card with supporting text below as a natural
        lead-in to additional content. This card has even longer content
        than the first to show that equal height action.
      </p>
    </div>
    <div
      className="mt-auto border-t-2 border-neutral-100 px-6 py-3 text-center text-surface/75 dark:border-white/10 dark:text-neutral-300">
      <small>Last updated 3 mins ago</small>
    </div>
  </div>
  <div
    className="mx-3 mt-6 flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
    <a href="#!">
      <img
        className="rounded-t-lg"
        src="https://tecdn.b-cdn.net/img/new/standard/city/042.webp"
        alt="Palm Springs Road" />
    </a>
    <div className="p-6">
      <h5 className="mb-2 text-xl font-medium leading-tight">Card title</h5>
      <p className="mb-4 text-base">
        This is a wider card with supporting text below as a natural
        lead-in to additional content. This card has even longer content
        than the first to show that equal height action.
      </p>
    </div>
    <div
      className="mt-auto border-t-2 border-neutral-100 px-6 py-3 text-center text-surface/75 dark:border-white/10 dark:text-neutral-300">
      <small>Last updated 3 mins ago</small>
    </div>
  </div>
</div>
    )
}