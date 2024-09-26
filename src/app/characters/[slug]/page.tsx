'use client';
import { useEffect, useState } from "react";
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

export default function Character({ params }: { params: { slug: string } }) {
  const [character, setCharacter] = useState<Character | null>(null); // Initialize as null

  useEffect(() => {
    const fetchCharacter = async () => {
      const endpoint = `https://rickandmortyapi.com/api/character/${params.slug}`;
      const cachedData = localStorage.getItem(`character_detail_page_${params.slug}`);

      console.log(endpoint);

      if (cachedData) {
        // Parse and set the cached data
        const data: Character = JSON.parse(cachedData);
        setCharacter(data);
      } else {
        // Fetch new data if not cached
        const response = await fetch(endpoint);
        const data = await response.json();

        // Set character data
        setCharacter(data);

        // Store the fetched data in localStorage
        localStorage.setItem(`character_detail_page_${params.slug}`, JSON.stringify(data));
      }
    };

    fetchCharacter();
  }, [params.slug]);

  // Conditional rendering
  if (!character) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  // Extract the origin ID from the origin URL
  const originId = character.origin.url.split('/').pop(); // Get the last part of the URL

  return (
    <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800'>
      <Image
        src={character.image}
        width={200}
        height={500}
        alt={character.name}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{character.name}</h5>
        <p className="mb-3 font-normal">
          <strong>Status: </strong>
          <span className="text-gray-700 dark:text-gray-400">{character.status}</span>
        </p>

        <p className="mb-3 font-normal">
          <strong>Species: </strong>
          <span className="text-gray-700 dark:text-gray-400">{character.species}</span>
        </p>

        <p className="mb-3 font-normal">
          <strong>Type: </strong>
          <span className="text-gray-700 dark:text-gray-400">{character.type}</span>
        </p>

        <p className="mb-3 font-normal">
          <strong>Gender: </strong>
          <span className="text-gray-700 dark:text-gray-400">{character.gender}</span>
        </p>

        <p className="mb-3 font-normal">
          <strong>Origin: </strong>
          {originId ? (
            <Link href={`/locations/${originId}`} className="text-gray-700 dark:text-gray-400">
              {character.origin.name}
            </Link>
          ) : (
            <span className="text-gray-700 dark:text-gray-400">Unknown</span>
          )}
        </p>
      </div>
    </div>
  );
}
