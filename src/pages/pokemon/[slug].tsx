import { GetServerSideProps } from "next";
import axios from "axios";
import Layout from "@/components/layout";
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
  return (
    <Layout title={pokemon.name}>
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <Image
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="w-full h-64 object-contain"
            width={230}
            height={230}
          />
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <p>ID: {pokemon.id}</p>
          <p>Height: {pokemon.height} decimetres</p>
          <p>Weight: {pokemon.weight} hectograms</p>
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
