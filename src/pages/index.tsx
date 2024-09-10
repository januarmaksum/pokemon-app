"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import ThemeSwitch from "@/components/ThemeSwitch";
import { getPokemonList } from "@/services/pokemonService";
import { PokemonList } from "@/interfaces";
import PokemonCard from "@/components/PokemonCard";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokemonList | null>(
    null
  );

  useEffect(() => {
    setMounted(true);
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const data = await getPokemonList();
      setPokemonList(data);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <Layout title="Pokémon App">
      <div className="container mx-auto px-4">
        <div className="justify-end mb-4 hidden">
          <ThemeSwitch />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {pokemonList?.results.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
