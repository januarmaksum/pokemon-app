import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getPokemonSpecies,
  getEvolutionChain,
} from "@/services/pokemonService";
import { extractEvolutionChain } from "@/utils";
import Image from "next/image";

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
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  return (
    <div className="flex justify-center items-center gap-4">
      {evolutions.map((evolution) => (
        <div key={evolution.id} className="text-center">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
            alt={evolution.name}
            className="w-24 h-24"
            width={96}
            height={96}
          />
          <p className="capitalize">{evolution.name}</p>
        </div>
      ))}
    </div>
  );
};

export default EvolutionChain;
