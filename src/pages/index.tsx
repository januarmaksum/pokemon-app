import Layout from "@/components/layout";
import { getPokemonList } from "@/services/pokemonService";
import PokemonCard from "@/components/PokemonCard";
import { GetServerSideProps } from "next";
import axios from "axios";

interface HomeProps {
  pokemonDetails: Array<{ name: string; id: number; imageUrl: string }>;
  error: boolean;
}

export default function Home({ pokemonDetails, error }: HomeProps) {
  if (error) {
    return (
      <Layout title="Pokémon App">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">Error fetching Pokémon data</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Pokémon App">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {pokemonDetails.map(
            (pokemon: { name: string; id: number; imageUrl: string }) => (
              <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                imageUrl={pokemon.imageUrl}
              />
            )
          )}
        </div>
      </div>
    </Layout>
  );
}

// Fetch Pokémon data on the server side
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const pokemonList = await getPokemonList(9, 0);

    if (!pokemonList) {
      throw new Error("Pokemon list is null");
    }

    const pokemonDetailsPromises = pokemonList.results.map(async (pokemon) => {
      const detailsResponse = await axios.get(pokemon.url);
      const { id, sprites } = detailsResponse.data;
      const imageUrl = sprites.other.dream_world.front_default || sprites.front_default;
      return { name: pokemon.name, id, imageUrl };
    });

    const pokemonDetails = await Promise.all(pokemonDetailsPromises);

    return {
      props: {
        pokemonDetails,
        error: false,
      },
    };
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return {
      props: {
        pokemonDetails: [],
        error: true,
      },
    };
  }
};
