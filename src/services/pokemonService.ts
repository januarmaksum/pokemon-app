import axios from "axios";
import { PokemonDetail, PokemonList } from "@/interfaces";

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
    const { id, name, height, weight, sprites, types, moves } = response.data;
    const imageUrl =
      sprites.other.dream_world.front_default || sprites.front_default;

    return {
      id,
      name,
      height,
      weight,
      sprites,
      imageUrl,
      types,
      moves,
    };
  } catch (error) {
    console.error("Error fetching Pokémon detail:", error);
    return null;
  }
};
