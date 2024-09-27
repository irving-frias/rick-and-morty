'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Use the correct import for useSearchParams
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

const CharacterList = ({ page }: { page: number }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      const endpoint = `https://rickandmortyapi.com/api/character/?page=${page}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      setCharacters(data.results);
      setPaginationInfo(data.info);
    };

    fetchCharacters();
  }, [page]);

  if (!characters.length) return <div>Loading characters...</div>;

  return (
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
      {paginationInfo && (
        <div className="flex justify-between mt-4">
          {paginationInfo.prev && <Link href={`?page=${page - 1}`}>Previous</Link>}
          {paginationInfo.next && <Link href={`?page=${page + 1}`}>Next</Link>}
        </div>
      )}
    </div>
  );
};

export default function Characters() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1; // Default to page 1

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CharacterList page={page} />
    </Suspense>
  );
}
