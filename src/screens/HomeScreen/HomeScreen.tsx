import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { FlashList } from '@shopify/flash-list';
import { fetchPokemonList, fetchPokemonDetails } from '../../api/pokeapi';
import { Pokemon } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filtered, setFiltered] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [offset, setOffset] = useState(0); // Track current offset for pagination
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Prevent fetching when already in progress
  const [hasMore, setHasMore] = useState(true); // Flag to check if there are more items to fetch

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Fetch initial Pokémon data on component mount
  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    if (isFetchingMore || !hasMore) return; // Prevent loading if already fetching or no more data

    setIsFetchingMore(true); // Set fetching state to true
    const limit = 20; // Number of items per request
    const data = await fetchPokemonList(offset, limit); // Fetch data

    if (data.results.length === 0) {
      setHasMore(false); // No more data to fetch
    }

    setPokemon(prev => [...prev, ...data.results]); // Append new data to existing list
    setFiltered(prev => [...prev, ...data.results]); // Update filtered list
    setOffset(prev => prev + limit); // Update offset for next batch
    setLoading(false); // Set loading state to false after initial load
    setIsFetchingMore(false); // Reset fetching state
  };

  const handleSearch = (text: string) => {
    // Filter Pokémon based on search query
    const filteredData = pokemon.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredData);
  };

  const handlePress = async (poke: Pokemon) => {
    // Fetch detailed info for the selected Pokémon
    const details = await fetchPokemonDetails(poke.url);
    navigation.navigate('Details', { pokemon: details });
  };

  const handleEndReached = useCallback(() => {
    if (!isFetchingMore && hasMore) { // Load more data if not already fetching
      setIsFetchingMore(true);
      loadPokemon(); // Fetch additional Pokémon data
    }
  }, [isFetchingMore, hasMore]);

  // Show loading indicator during the initial load
  if (loading && pokemon.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Pokémon"
        onChangeText={handleSearch}
      />
      <FlashList
        data={filtered}
        estimatedItemSize={80}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        onEndReached={handleEndReached} // Trigger when near the bottom
        onEndReachedThreshold={0.5} // Threshold for triggering load more
        ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" /> : null} // Show loading spinner when fetching more data
      />
    </View>
  );
}
