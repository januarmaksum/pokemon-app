"use client";

import * as React from "react";
import Layout from "@/components/Layout";
import PokemonCard from "@/components/PokemonCard";

interface Pokemon {
  name: string;
  id: number;
  imageUrl: string;
  nickname?: string;
}

export default function MyPokemon() {
  const [myPokemon, setMyPokemon] = React.useState<Pokemon[]>([]);

  React.useEffect(() => {
    const storedPokemon = localStorage.getItem("myPokemon");
    if (storedPokemon) {
      setMyPokemon(JSON.parse(storedPokemon));
    }
  }, []);

  return (
    <Layout title="My Pokémon">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold my-6">My Pokémon</h1>
        {myPokemon.length === 0 ? (
          <p className="text-lg">You haven&apos;t caught any Pokémon yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {myPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                imageUrl={pokemon.imageUrl}
                nickname={pokemon.nickname}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
