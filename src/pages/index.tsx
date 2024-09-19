import * as React from "react";
import Layout from "@/components/Layout";
import { getPokemonDetail, getPokemonList } from "@/services/pokemonService";
import PokemonCard from "@/components/PokemonCard";
import { GetServerSideProps } from "next";
import { useInView } from "react-intersection-observer";

interface HomeProps {
  initialPokemon: Array<{ name: string; id: number; imageUrl: string }>;
  error: boolean;
}

export default function HomePage({ initialPokemon, error }: HomeProps) {
  const [pokemonDetails, setPokemonDetails] = React.useState(initialPokemon);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [offset, setOffset] = React.useState(12);

  const { ref: loaderRef, inView } = useInView({
    threshold: 1.0,
  });

  React.useEffect(() => {
    const cachedPokemon = sessionStorage.getItem("pokemonData");
    const cachedOffset = sessionStorage.getItem("pokemonOffset");

    if (cachedPokemon) {
      setPokemonDetails(JSON.parse(cachedPokemon));
      setOffset(parseInt(cachedOffset || "12", 10));
    }
  }, []);

  const fetchMorePokemon = React.useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newPokemonList = await getPokemonList(12, offset);
      if (!newPokemonList || newPokemonList.results.length === 0) {
        setHasMore(false);
      } else {
        const newPokemonDetails = await Promise.all(
          newPokemonList.results.map(async (pokemon) => {
            const pokemonDetail = await getPokemonDetail(pokemon.name);
            return pokemonDetail
              ? {
                  name: pokemonDetail.name,
                  id: pokemonDetail.id,
                  imageUrl: pokemonDetail.imageUrl,
                }
              : undefined;
          })
        );

        const updatedPokemonDetails = [
          ...pokemonDetails,
          ...(newPokemonDetails.filter(Boolean) as {
            name: string;
            id: number;
            imageUrl: string;
          }[]),
        ];

        sessionStorage.setItem("pokemonData", JSON.stringify(updatedPokemonDetails));
        sessionStorage.setItem("pokemonOffset", (offset + 12).toString());

        setPokemonDetails(updatedPokemonDetails);
        setOffset((prev) => prev + 12);
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset, pokemonDetails]);

  React.useEffect(() => {
    if (inView) {
      fetchMorePokemon();
    }
  }, [inView, fetchMorePokemon]);

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
        <div ref={loaderRef} className="text-center pb-20">
          {loading && <p>Loading more Pokémon...</p>}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const pokemonList = await getPokemonList(12, 0);

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
        initialPokemon: pokemonDetails,
        error: false,
      },
    };
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return {
      props: {
        initialPokemon: [],
        error: true,
      },
    };
  }
};
