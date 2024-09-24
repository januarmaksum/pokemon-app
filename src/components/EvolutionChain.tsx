import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getPokemonSpecies,
  getEvolutionChain,
} from "@/services/pokemonService";
import { extractEvolutionChain, removeDash } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface EvolutionChainProps {
  pokemonId: number;
}

const fetchEvolutionData = async (pokemonId: number) => {
  const speciesData = await getPokemonSpecies(pokemonId);
  const evolutionData = await getEvolutionChain(
    speciesData?.evolution_chain?.url.replace(/\/$/, "") || ""
  );
  return extractEvolutionChain(evolutionData.chain);
};

const EvolutionChain: React.FC<EvolutionChainProps> = ({ pokemonId }) => {
  const {
    data: evolutions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemonEvolution", pokemonId],
    queryFn: () => fetchEvolutionData(pokemonId),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  return (
    <div className="flex justify-center items-center gap-4 mt-2 group">
      {evolutions.map((evolution) => (
        <Link href={evolution.name} key={evolution.id} className="text-center">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
            alt={removeDash(evolution.name)}
            className="w-24 h-24 drop-shadow-xl object-contain"
            width={96}
            height={96}
          />
          <p className="capitalize text-sm md:text-base">{removeDash(evolution.name)}</p>
        </Link>
      ))}
    </div>
  );
};

export default EvolutionChain;
