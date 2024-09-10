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

// You can add more interfaces here as needed, for example:
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
    // Add other sprite properties as needed
  };
  // Add other properties from the detailed Pokemon response as needed
}
