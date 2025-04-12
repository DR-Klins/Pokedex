import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Pokemon } from '../../types';

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Fetch initial Pokémon data on component mount
  useEffect(() => {
    loadPokemon();
  }, []);

  /**
   * Loads a batch of Pokémon from the API.
   * Uses currentId to paginate.
   */
  const loadPokemon = async () => {
    // Prevent duplicate fetches or fetching when no more data
    if (isFetchingMore || !hasMore) return;

    setIsFetchingMore(true);
    const limit = 40;

    try {
      const listRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${currentId - 1}&limit=${limit}`
      );

      if (!listRes.ok) {
        throw new Error(`API response not OK: ${listRes.status}`);
      }

      const listData = await listRes.json();

      // Fetch details for each Pokémon in parallel
      const detailResponses = await Promise.all(
        listData.results.map((pokemon: { url: string }) => fetch(pokemon.url))
      );

      const detailData = await Promise.all(
        detailResponses.map((res) => {
          if (!res.ok) {
            throw new Error(`Detail fetch failed: ${res.status}`);
          }
          return res.json();
        })
      );

      const newPokemonList: Pokemon[] = detailData.map((data) => {
        const image =
          data.sprites?.other?.['official-artwork']?.front_default ||
          data.sprites?.front_default;

        return {
          id: data.id,
          name: data.name,
          image,
        };
      });

      // Stop pagination if no new data is returned
      if (newPokemonList.length === 0) setHasMore(false);

      setPokemon((prev) => [...prev, ...newPokemonList]);
      setCurrentId((prev) => prev + limit);
    } catch (err) {
      console.warn('Error loading Pokémon:', err);
      setHasMore(false); // Prevent further attempts if something broke
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  /**
   * Fetches full Pokémon details and navigates to the Details screen.
   */
  const handlePress = async (poke: Pokemon) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${poke.id}/`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch details for Pokémon ID ${poke.id}`);
      }

      const details = await response.json();
      navigation.navigate('Details', { pokemon: details });
    } catch (err) {
      console.error(' Failed to fetch Pokémon details:', err);
    }
  };

  /**
   * Loads more Pokémon when the list is scrolled near the bottom.
   */
  const handleEndReached = useCallback(() => {
    if (!isFetchingMore && hasMore) {
      loadPokemon();
    }
  }, [isFetchingMore, hasMore]);

  // Filter Pokémon based on the search input
  const filteredData = searchText
    ? pokemon.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : pokemon;

  // Show loader when app is initially loading
  if (loading && pokemon.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Pokémon"
        onChangeText={setSearchText}
        value={searchText}
      />

      <FlashList
        data={filteredData}
        estimatedItemSize={120}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const imageOpacity = new Animated.Value(0); // Controls image fade-in

          const onLoad = () => {
            Animated.timing(imageOpacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }).start();
          };

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handlePress(item)}
            >
              {item.image && (
                <Animated.View style={{ opacity: imageOpacity }}>
                  <FastImage
                    source={{ uri: item.image }}
                    style={{ width: 100, height: 100, marginBottom: 8 }}
                    resizeMode={FastImage.resizeMode.contain}
                    onLoad={onLoad}
                  />
                </Animated.View>
              )}
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? <ActivityIndicator size="small" /> : null
        }
      />
    </View>
  );
}
