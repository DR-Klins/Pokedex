import axios from 'axios';

const API_BASE = 'https://pokeapi.co/api/v2';

/**
 * Fetches a paginated list of Pokémon from the PokéAPI.
 * @param offset - Pagination offset (default is 0)
 * @param limit - Number of Pokémon to fetch (default is 20)
 */
export const fetchPokemonList = async (offset = 0, limit = 20) => {
  const response = await axios.get(`${API_BASE}/pokemon?offset=${offset}&limit=${limit}`);
  return response.data;
};

/**
 * Fetches detailed data for a single Pokémon.
 * @param url - The specific API URL for the Pokémon
 */
export const fetchPokemonDetails = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};