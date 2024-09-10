import axios from "axios";
import { PokemonList } from "@/interfaces/pokemon.interfaces";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = async (
  limit: number = 9,
  offset: number = 0
): Promise<PokemonList> => {
  const response = await axios.get<PokemonList>(`${BASE_URL}/pokemon`, {
    params: { limit, offset },
  });
  return response.data;
};
