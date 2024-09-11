export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  nickname?: string;
  imageUrl?: string;
  moves: PokemonMove[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: PokemonStats[];
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
