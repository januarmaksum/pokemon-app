export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasicInfo[];
}

export interface PokemonBasicInfo {
  name: string;
  url: string;
}


export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
        dream_world: {
            front_default: string
        }
    }
  };
}
