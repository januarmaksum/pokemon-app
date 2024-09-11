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
      <div className="container max-w-3xl mx-auto px-4 mt-4">
        {myPokemon.length === 0 ? (
          <p className="text-2xl font-bold mb-4 text-center">No Pokemon</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">My Pokémon</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
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
          </>
        )}
      </div>
    </Layout>
  );
}
