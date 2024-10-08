import * as React from "react";
import { GetServerSideProps } from "next";
import Layout from "@/components/Layout";
import CaughtPokemonModal from "@/components/CaughtPokemonModal";
import PokemonStatsBar from "@/components/PokemonStatsBar";
import useToast from "@/components/Toast";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import { PokemonDetail, PokemonStats } from "@/interfaces";
import { getPokemonDetail } from "@/services/pokemonService";
import { useRouter } from "next/router";
import {
  capitalizeFirstLetter,
  formatHeight,
  formatWeight,
  removeDash,
} from "@/utils";
import IconLabel from "@/components/ui/IconLabel";
import { Ruler, Weight } from "@/components/Icons";
import EvolutionChain from "@/components/EvolutionChain";

interface PokemonDetailPageProps {
  pokemon: Pick<
    PokemonDetail,
    "name" | "id" | "height" | "weight" | "types" | "moves"
  > & {
    imageUrl: string;
    stats: PokemonStats[];
  };
}

export default function PokemonDetailPage({ pokemon }: PokemonDetailPageProps) {
  const router = useRouter();
  const showToast = useToast();
  const [caught, setCaught] = React.useState(false);
  const [nickname, setNickname] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const { asPath } = router;
    const lowerCasePath = asPath.toLowerCase();

    if (asPath !== lowerCasePath) {
      router.replace(lowerCasePath);
    }
  }, [router]);

  const catchPokemon = () => {
    const successChance = Math.random() < 0.5; // 50% chance
    setCaught(successChance);
    setNickname("");
    setError("");

    showToast.dismiss();

    if (successChance) {
      showToast.success(`You caught ${removeDash(pokemon.name)}!`);
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
    showToast.success(`${removeDash(pokemon.name)} has been caught and saved!`);
    router.push("/my-pokemon");
  };

  return (
    <Layout
      title={capitalizeFirstLetter(removeDash(pokemon.name)) + ` - Pokémon`}
    >
      <div className="container max-w-3xl mx-auto px-4 mt-4 flex sm:gap-4 flex-wrap sm:flex-nowrap pb-8">
        <div className="w-full sm:w-1/2">
          <div className="bg-white dark:bg-dark-light rounded-lg shadow-sm p-6 mb-4">
            <Image
              src={pokemon.imageUrl}
              alt={removeDash(pokemon.name)}
              className="w-full h-64 object-contain drop-shadow-xl"
              width={250}
              height={250}
              priority
            />
            <h1 className="text-4xl font-bold capitalize text-center mt-4">
              {removeDash(pokemon.name)}
            </h1>

            <div className="flex justify-center">
              <button
                onClick={catchPokemon}
                className="mt-4 px-4 py-2 dark:bg-yellow-500 bg-red-500 dark:text-black text-white rounded font-medium"
              >
                Try Catch!
              </button>
            </div>

            {caught && (
              <CaughtPokemonModal
                pokemonName={removeDash(pokemon.name)}
                nickname={nickname}
                error={error}
                onNicknameChange={handleNicknameChange}
                onCancel={() => setCaught(false)}
                onSave={handleCatchSubmit}
              />
            )}
          </div>

          <div className="bg-white dark:bg-dark-light p-4 rounded-lg mb-4 shadow-sm hidden">
            <div className="flex gap-3">
              <IconLabel
                icon={<Ruler size={"18px"} className="rotate-45" />}
                label={formatHeight(pokemon.height)}
                title="Height"
              />
              <IconLabel
                icon={<Weight size={"18px"} />}
                label={formatWeight(pokemon.weight)}
                title="Weight"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-light p-4 rounded-lg mb-4 shadow-sm">
            <h2 className="text-2xl font-semibold">Evolutions</h2>
            <EvolutionChain pokemonId={pokemon.id} />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <div className="bg-white dark:bg-dark-light p-4 rounded-lg mb-4 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Stats</h2>
            {pokemon.stats.map((stat) => (
              <PokemonStatsBar
                key={stat.stat.name}
                name={stat.stat.name.replace("-", " ")}
                value={stat.base_stat}
              />
            ))}
          </div>

          <div className="bg-white dark:bg-dark-light p-4 rounded-lg mb-4 shadow-sm">
            <h2 className="text-2xl font-semibold">Types</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm capitalize"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark-light p-4 rounded-lg mt-4 shadow-sm">
            <h2 className="text-2xl font-semibold">Moves</h2>
            <div className="mt-2 overflow-y-auto">
              <ul className="list-disc list-inside">
                {pokemon.moves.slice(0, 3).map((move) => (
                  <li key={move.move.name} className="capitalize">
                    {move.move.name}
                  </li>
                ))}
              </ul>
              {pokemon.moves.length > 3 && (
                <p className="mt-2 text-sm text-gray-500">
                  And {pokemon.moves.length - 3} more moves...
                </p>
              )}
            </div>
          </div>
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
    const pokemon = await getPokemonDetail(slug.toLowerCase());

    if (!pokemon) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pokemon,
      },
    };
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return {
      notFound: true,
    };
  }
};
