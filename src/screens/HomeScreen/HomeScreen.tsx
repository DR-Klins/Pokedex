import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';

// Local imports
import styles from './styles';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Stat, Pokemon } from '../../types';
import { fetchPokemonList, fetchPokemonDetails } from '../../api/pokeapi';
import PokemonImage from '../../components/PokemonImage';

export default function HomeScreen() {
  // ---------- State Declarations ----------
  const [pokemon, setPokemon] = useState<Pokemon[]>([]); // List of all fetched Pokémon
  const [searchText, setSearchText] = useState(''); // Search bar text
  const [loading, setLoading] = useState(true); // Initial loading state
  const [currentId, setCurrentId] = useState(1); // Used to keep track of next batch
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Is more data being loaded?
  const [hasMore, setHasMore] = useState(true); // Is there more data to fetch?
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode toggle
  const [loadError, setLoadError] = useState(false); // Error state

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // ---------- Fetch Pokémon Data ----------
  const loadPokemon = async () => {
    if (isFetchingMore || !hasMore) return;

    setIsFetchingMore(true);
    const limit = 40;

    try {
      const data = await fetchPokemonList(currentId - 1, limit);

      const detailResponses = await Promise.all(
        data.results.map((poke: { url: string }) => fetchPokemonDetails(poke.url))
      );

      const newPokemonList: Pokemon[] = detailResponses.map((data) => {
        const image =
          data.sprites?.other?.['official-artwork']?.front_default ||
          data.sprites?.front_default;

        const types = data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name);

        const stats: Stat[] = data.stats.map(
          (statInfo: { base_stat: number; stat: { name: string } }) => ({
            name: statInfo.stat.name,
            base_stat: statInfo.base_stat,
          })
        );

        return {
          id: data.id,
          name: data.name,
          image,
          types,
          stats,
        };
      });

      if (newPokemonList.length === 0) setHasMore(false);

      setPokemon((prev) => [...prev, ...newPokemonList]);
      setCurrentId((prev) => prev + limit);
      setLoading(false);
    } catch (err) {
      console.warn('Error loading Pokémon:', err);
      setLoadError(true);
      setHasMore(false);
    } finally {
      setIsFetchingMore(false);
    }
  };

  // ---------- Lifecycle ----------
  useEffect(() => {
    loadPokemon();
  }, []);

  // ---------- Memoized / Callback Functions ----------
  const handleEndReached = useCallback(() => {
    if (!isFetchingMore && hasMore) {
      loadPokemon();
    }
  }, [isFetchingMore, hasMore]);

  const handleGreenButtonPress = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const filteredData = useMemo(() => {
    return searchText
      ? pokemon.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()))
      : pokemon;
  }, [searchText, pokemon]);

  // ---------- Render States ----------
  if (loading && pokemon.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;
  }

  if (loadError) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          Something went wrong while loading Pokémon.
        </Text>
      </View>
    );
  }

  // ---------- Main UI ----------
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      {/* Top UI: Pokédex lens and lights */}
      <View style={styles.pokedexTop}>
        <View style={styles.lensOuter}>
          <View style={styles.lensInner} />
        </View>
        <View style={styles.indicatorRow}>
          <View style={styles.indicatorLightGreen} />
          <View style={styles.indicatorLightRed} />
          <View style={styles.indicatorLightYellow} />
        </View>
      </View>

      {/* Search Bar Input */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={[
            styles.searchBar,
            isDarkMode ? { backgroundColor: 'black', color: 'white' } : { backgroundColor: '#A7D8F2' },
          ]}
          placeholder="Search Pokémon"
          onChangeText={setSearchText}
          value={searchText}
          editable={!isDarkMode}
          selectTextOnFocus={!isDarkMode}
        />
      </View>

      {/* Scrollable Pokémon Card List */}
      <View style={styles.contentWrapper}>
        <View style={styles.sideBorder} />
        <View style={styles.content}>
          {isDarkMode ? (
            <View style={styles.overlay} />
          ) : (
            <FlashList
              data={filteredData}
              estimatedItemSize={120}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" /> : null}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    const scale = new Animated.Value(1);
                    Animated.timing(scale, {
                      toValue: 1.2,
                      duration: 300,
                      useNativeDriver: true,
                    }).start(() => {
                      navigation.navigate('Details', {
                        name: item.name,
                        stats: item.stats,
                        types: item.types,
                        image: item.image,
                      });
                    });
                  }}
                >
                  {/* Pokéball background behind image */}
                  <View style={styles.pokeballContainer}>
                    <FastImage
                      source={require('../../assets/pokeball.png')}
                      style={styles.pokeballImage}
                    />
                  </View>

                  {/* Pokémon Artwork */}
                  <PokemonImage image={item.image} style={styles.pokemonImage} />

                  {/* Pokémon name and types */}
                  <View style={styles.columnContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.typesContainer}>
                      {item.types.map((type, index) => (
                        <Text key={index} style={styles.typeText}>
                          {type}
                        </Text>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <View style={styles.sideBorder} />
      </View>

      {/* Bottom Controls */}
      <View style={styles.footer} />
      <TouchableOpacity style={styles.greenButton} onPress={handleGreenButtonPress}>
        <Text style={styles.greenButtonText}>| | |</Text>
      </TouchableOpacity>
    </View>
  );
}
