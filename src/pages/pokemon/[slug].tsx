import * as React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Layout from "@/components/Layout";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";

interface PokemonDetailPageProps {
  pokemon: {
    name: string;
    id: number;
    imageUrl: string;
    height: number;
    weight: number;
  };
}

export default function PokemonDetailPage({ pokemon }: PokemonDetailPageProps) {
  const [caught, setCaught] = React.useState(false);
  const [nickname, setNickname] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const catchPokemon = () => {
    const successChance = Math.random() < 0.5; // 50% chance
    setSuccess(successChance);
    setCaught(true);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleCatchSubmit = () => {
    if (!nickname) {
      setError("Please provide a nickname.");
      return;
    }
    setError("");

    const newPokemon = {
      name: pokemon.name,
      id: pokemon.id,
      imageUrl: pokemon.imageUrl,
      nickname,
    };

    const storedPokemon = JSON.parse(localStorage.getItem("myPokemon") || "[]");
    localStorage.setItem(
      "myPokemon",
      JSON.stringify([...storedPokemon, newPokemon])
    );

    setCaught(false);
    setNickname("");
  };

  return (
    <Layout title={pokemon.name + ` - Pokédex`}>
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <Image
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="w-full h-64 object-contain"
            width={250}
            height={250}
            priority
          />
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <p>ID: {pokemon.id}</p>
          <p>Height: {pokemon.height} decimetres</p>
          <p>Weight: {pokemon.weight} hectograms</p>

          {!caught ? (
            <button
              onClick={catchPokemon}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Catch Pokémon
            </button>
          ) : success ? (
            <div className="mt-4">
              <h2 className="text-xl font-bold">
                You&apos;ve caught {pokemon.name}!
              </h2>
              <input
                type="text"
                placeholder="Enter a nickname"
                value={nickname}
                onChange={handleNicknameChange}
                className="mt-2 p-2 border rounded"
              />
              <button
                onClick={handleCatchSubmit}
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Save Pokémon
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          ) : (
            <p className="mt-4 text-red-500">
              Failed to catch Pokémon. Try again!
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as Params;

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${slug}`
    );
    const { id, name, height, weight, sprites } = response.data;
    const imageUrl =
      sprites.other.dream_world.front_default || sprites.front_default;

    return {
      props: {
        pokemon: {
          name,
          id,
          height,
          weight,
          imageUrl,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return {
      notFound: true,
    };
  }
};
