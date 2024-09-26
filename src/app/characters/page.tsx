'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface CharacterOrigin {
  name: string;
  url: string;
}

interface CharacterLocation {
  name: string;
  url: string;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterOrigin;
  location: CharacterLocation;
  image: string;
  episodes: Array<string>;
  url: string;
  created: string;
}

interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export default function Characters() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1'; // Default to page 1 if not provided
  const [characters, setCharacters] = useState<Character[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
  const currentPage = Number(page);

  const fetchCharacters = async (page: number) => {
    const endpoint = `https://rickandmortyapi.com/api/character?page=${page}`;

    // Check if data is cached in localStorage
    const cachedData = localStorage.getItem(`characters_page_${page}`);

    if (cachedData) {
      // Parse and set the cached data
      const { results, info }: { results: Character[], info: PaginationInfo } = JSON.parse(cachedData);
      setCharacters(results);
      setPaginationInfo(info);
    } else {
      // Fetch new data if not cached
      const response = await fetch(endpoint);
      const data = await response.json();
      setCharacters(data.results);
      setPaginationInfo(data.info);

      // Store the fetched data in localStorage
      localStorage.setItem(`characters_page_${page}`, JSON.stringify(data));
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (paginationInfo?.next) {
      // Update the URL with the next page
      window.history.pushState({}, '', `?page=${currentPage + 1}`);
      fetchCharacters(currentPage + 1); // Fetch new data
    }
  };

  const handlePrevPage = () => {
    if (paginationInfo?.prev) {
      // Update the URL with the previous page
      window.history.pushState({}, '', `?page=${currentPage - 1}`);
      fetchCharacters(currentPage - 1); // Fetch new data
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-3 gap-4">
          {characters.map((character) => (
            <div key={character.id}>
              <Link href={`/characters/${character.id}`} className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                <Image
                  src={character.image}
                  width={200}
                  height={500}
                  alt={character.name}
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{character.name}</h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{character.status}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className={`px-4 py-2 bg-gray-300 rounded ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span>Page {currentPage} of {paginationInfo?.pages}</span>
        <button
          onClick={handleNextPage}
          disabled={!paginationInfo?.next}
          className={`px-4 py-2 bg-gray-300 rounded ${!paginationInfo?.next ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
