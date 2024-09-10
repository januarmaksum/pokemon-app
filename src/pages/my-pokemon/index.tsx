// src/pages/my-pokemon/index.tsx

import { useState, useEffect } from "react";
import Layout from "@/components/layout";

interface Pokemon {
  name: string;
  id: number;
  imageUrl: string;
}

export default function MyPokemon() {
  const [myPokemon, setMyPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
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
          <p className="text-lg">You haven't caught any Pokémon yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {myPokemon.map((pokemon) => (
              <div key={pokemon.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <img
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  className="w-full h-32 object-contain"
                />
                <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
                <p>ID: {pokemon.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
