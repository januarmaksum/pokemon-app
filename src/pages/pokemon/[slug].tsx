import * as React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Layout from "@/components/Layout";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import useToast from "@/components/Toast";
import { PokemonDetail } from "@/interfaces";

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
  const showToast = useToast();
  const [caught, setCaught] = React.useState(false);
  const [nickname, setNickname] = React.useState("");
  const [error, setError] = React.useState("");

  const catchPokemon = () => {
    const successChance = Math.random() < 0.5; // 50% chance
    setCaught(successChance);
    setNickname("");

    showToast.dismiss();

    if (successChance) {
      showToast.success(`You caught ${pokemon.name}!`);
    } else {
      showToast.error("Failed to catch Pokémon. Try again!");
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleCatchSubmit = () => {
    if (!nickname) {
      setError("Please provide a nickname.");
      return;
    }
    const storedPokemon = JSON.parse(localStorage.getItem("myPokemon") || "[]");
    const nicknameExists = storedPokemon.some(
      (p: PokemonDetail) => p.nickname === nickname
    );

    if (nicknameExists) {
      showToast.dismiss();
      showToast.error(`Nickname "${nickname}" already exists!`);
      return;
    }

    setError("");

    const newPokemon = {
      name: pokemon.name,
      id: pokemon.id,
      imageUrl: pokemon.imageUrl,
      nickname,
    };

    localStorage.setItem(
      "myPokemon",
      JSON.stringify([...storedPokemon, newPokemon])
    );

    setCaught(false);
    setNickname("");
    showToast.dismiss();
    showToast.success(`${pokemon.name} has been caught and saved!`);
  };

  return (
    <Layout title={pokemon.name + ` - Pokémon`}>
      <div className="container max-w-3xl mx-auto px-4 mt-4">
        <div className="bg-white dark:bg-dark-light rounded-lg shadow-md p-6">
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

          <button
            onClick={catchPokemon}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Catch Pokémon
          </button>

          {caught && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-dark-light rounded-lg p-6 max-w-sm w-full text-center">
                <h2 className="text-xl font-bold mb-4">
                  You&apos;ve caught {pokemon.name}!
                </h2>
                <input
                  type="text"
                  placeholder="Enter a nickname"
                  value={nickname}
                  onChange={handleNicknameChange}
                  className="w-full p-2 border rounded mb-0"
                />
                {error && <p className="text-red-500 my-2">{error}</p>}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setCaught(false)}
                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCatchSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded font-medium"
                  >
                    Save Pokémon
                  </button>
                </div>
              </div>
            </div>
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
