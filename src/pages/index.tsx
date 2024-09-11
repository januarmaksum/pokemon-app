import Layout from "@/components/Layout";
import { getPokemonDetail, getPokemonList } from "@/services/pokemonService";
import PokemonCard from "@/components/PokemonCard";
import { GetServerSideProps } from "next";

interface HomeProps {
  pokemonDetails: Array<{ name: string; id: number; imageUrl: string }>;
  error: boolean;
}

export default function HomePage({ pokemonDetails, error }: HomeProps) {
  if (error) {
    return (
      <Layout title="Pokémon App">
        <div className="container max-w-3xl mx-auto px-4 text-center my-4">
          <h2 className="text-2xl font-bold">Error fetching Pokémon data</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Pokémon App">
      <div className="container max-w-3xl mx-auto px-4 mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const pokemonList = await getPokemonList(9, 0);

    if (!pokemonList) {
      throw new Error("Pokemon list is empty");
    }

    const pokemonDetailsPromises = pokemonList.results.map(async (pokemon) => {
      const pokemonDetail = await getPokemonDetail(pokemon.name);
      if (!pokemonDetail) {
        throw new Error(`Failed to fetch details for ${pokemon.name}`);
      }
      return {
        name: pokemonDetail.name,
        id: pokemonDetail.id,
        imageUrl: pokemonDetail.imageUrl,
      };
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
