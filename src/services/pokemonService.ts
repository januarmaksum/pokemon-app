import axios from "axios";
import { PokemonDetail, PokemonList, PokemonSpecies } from "@/interfaces";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = async (
  limit: number = 9,
  offset: number = 0
): Promise<PokemonList | null> => {
  try {
    const response = await axios.get<PokemonList>(`${BASE_URL}/pokemon`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return null;
  }
};

export const getPokemonDetail = async (
  slug: string
): Promise<PokemonDetail | null> => {
  try {
    const response = await axios.get<PokemonDetail>(
      `${BASE_URL}/pokemon/${slug}`
    );
    const { id, name, height, weight, sprites, types, moves, stats } =
      response.data;
    const imageUrl =
      sprites.other?.["official-artwork"]?.front_default ||
      sprites.front_default;

    return {
      id,
      name,
      height,
      weight,
      sprites,
      imageUrl,
      types,
      moves,
      stats,
    };
  } catch (error) {
    console.error("Error fetching Pokémon detail:", error);
    return null;
  }
};

export const getPokemonSpecies = async (
  pokemonId: number
): Promise<PokemonSpecies | null> => {
  try {
    const response = await axios.get<PokemonSpecies>(
      `${BASE_URL}/pokemon-species/${pokemonId}`
    );
    const { evolution_chain } = response.data;
    return {
      evolution_chain,
    };
  } catch (error) {
    console.error("Error fetching Pokémon species:", error);
    return null;
  }
};

export const getEvolutionChain = async (evolutionChainUrl: string) => {
  console.log('evolutionChainUrl: ', evolutionChainUrl);
  try {
    const response = await axios.get(evolutionChainUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon evolution chain:", error);
    return null;
  }
};
