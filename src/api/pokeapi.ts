// src/api/pokeapi.ts
import axios from 'axios';

const API_BASE = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (offset = 0, limit = 20) => {
  const response = await axios.get(`${API_BASE}/pokemon?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const fetchPokemonDetails = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };
  
