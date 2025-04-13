export interface Stat {
  name: string;
  base_stat: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: Stat[];
}
