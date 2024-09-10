import { useState, useEffect } from 'react';
import { PokemonDetail } from '@/interfaces';
import axios from 'axios';

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  const [details, setDetails] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(url);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    };
    fetchDetails();
  }, [url]);

  if (!details) {
    return <div className="animate-pulse bg-gray-200 rounded-lg h-48"></div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img src={details.sprites.other.dream_world.front_default} alt={name} className="w-full h-32 object-contain" />
      <div className="p-4">
        <h2 className="text-xl font-semibold capitalize text-gray-800 dark:text-white">{name}</h2>
        <p className="text-gray-600 dark:text-gray-300">#{details.id}</p>
      </div>
    </div>
  );
}