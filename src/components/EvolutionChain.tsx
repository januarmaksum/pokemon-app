import { useState, useEffect } from "react";
import {
  getPokemonSpecies,
  getEvolutionChain,
} from "@/services/pokemonService";
import { extractEvolutionChain } from "@/utils";
import Image from "next/image";

type Evolution = {
  name: string;
  id: string;
};

interface EvolutionChainProps {
  pokemonId: number;
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({ pokemonId }) => {
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      const speciesData = await getPokemonSpecies(pokemonId);
      const evolutionData = await getEvolutionChain(
        speciesData?.evolution_chain?.url.replace(/\/$/, "") || ""
      );
      const extractedEvolutions = extractEvolutionChain(evolutionData.chain);
      setEvolutions(extractedEvolutions);
    };

    fetchEvolutionData();
  }, [pokemonId]);

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
