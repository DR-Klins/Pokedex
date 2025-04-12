import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Pokemon } from '../../types';
import { fetchPokemonList, fetchPokemonDetails } from '../../api/pokeapi';
import styles from './styles';

export default function HomeScreen() {
  // State variables to store Pokemon data, search input, loading state, etc.
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchText, setSearchText] = useState(''); // Search bar input state
  const [loading, setLoading] = useState(true); // Loading state for initial data fetch
  const [currentId, setCurrentId] = useState(1); // Track the ID to paginate through the API
  const [isFetchingMore, setIsFetchingMore] = useState(false); // State to handle pagination fetches
  const [hasMore, setHasMore] = useState(true); // State to track if more Pokémon can be loaded

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Hook for navigation to other screens

  // Effect hook to load Pokémon data on initial render
  useEffect(() => {
    loadPokemon();
  }, []); // Empty dependency array means this runs only once, when the component mounts

  // Function to fetch Pokémon data from the API
  const loadPokemon = async () => {
    if (isFetchingMore || !hasMore) return; // Prevent multiple concurrent fetches

    setIsFetchingMore(true);
    const limit = 40; // Number of Pokémon to load in each batch

    try {
      // Fetch the list of Pokémon (names/URLs) for the current batch
      const data = await fetchPokemonList(currentId - 1, limit);

      // Fetch detailed information (sprites, etc.) for each Pokémon in the list
      const detailResponses = await Promise.all(
        data.results.map((poke: { url: string }) => fetchPokemonDetails(poke.url))
      );

      // Map the API responses to an array of Pokémon objects
      const newPokemonList: Pokemon[] = detailResponses.map((data) => {
        const image =
          data.sprites?.other?.['official-artwork']?.front_default ||
          data.sprites?.front_default; // Select the best available image URL

        return {
          id: data.id,
          name: data.name,
          image,
        };
      });

      // If no new Pokémon are returned, set the 'hasMore' flag to false
      if (newPokemonList.length === 0) setHasMore(false);

      // Update the state with the newly fetched Pokémon
      setPokemon((prev) => [...prev, ...newPokemonList]);
      setCurrentId((prev) => prev + limit); // Increment the current ID for the next fetch
      setLoading(false);
    } catch (err) {
      // Handle error if the fetch fails
      console.warn('Error loading Pokémon:', err);
      setHasMore(false); // No more Pokémon to fetch in case of error
    } finally {
      setIsFetchingMore(false); // Reset the fetching state regardless of success or failure
    }
  };

  // Callback function to handle when the end of the list is reached
  const handleEndReached = useCallback(() => {
    if (!isFetchingMore && hasMore) {
      loadPokemon(); // Load more Pokémon if possible
    }
  }, [isFetchingMore, hasMore]);

  // Filter the Pokémon list based on the search text
  const filteredData = searchText
    ? pokemon.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : pokemon;

  // Display loading indicator if data is still being fetched
  if (loading && pokemon.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;
  }

  // Components for drawing the black lines (styling purposes)
  const BlackLine1 = () => {
    return <View style={styles.line1} />;
  };
  const BlackLine2 = () => {
    return <View style={styles.line2} />;
  };
  const BlackLine3 = () => {
    return <View style={styles.line3} />;
  };
  const BlackLine4 = () => {
    return <View style={styles.line4} />;
  };

  // Function to handle green button press
  const handleGreenButtonPress = () => {
    console.log('Green button pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      {/* Retro Pokédex Top */}
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
      <BlackLine1 />
      <BlackLine2 />
      <BlackLine3 />

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Pokémon"
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      {/* Content Area */}
      <View style={styles.contentWrapper}>
        <View style={styles.sideBorder} />
        <View style={styles.content}>
          <FlashList
            data={filteredData} // Render the filtered Pokémon data
            estimatedItemSize={120} // Optimize rendering for long lists
            keyExtractor={(item) => item.id.toString()} // Use Pokémon ID as key
            renderItem={({ item }) => {
              const imageOpacity = new Animated.Value(0); // Animation value for image opacity

              const onLoad = () => {
                Animated.timing(imageOpacity, {
                  toValue: 1, // Fade the image in when it's loaded
                  duration: 400,
                  useNativeDriver: true,
                }).start();
              };

              return (
                <TouchableOpacity style={styles.card}>
                  <View style={styles.pokeballContainer}>
                    <FastImage
                      source={require('../../assets/pokeball.png')}  // Local image of a Poké Ball
                      style={styles.pokeballImage}
                    />
                  </View>
                  {item.image && (
                    <Animated.View style={{ opacity: imageOpacity }}>
                      <FastImage
                        source={{ uri: item.image }}
                        style={styles.pokemonImage}
                        resizeMode={FastImage.resizeMode.contain}
                        onLoad={onLoad} // Trigger animation on load
                      />
                    </Animated.View>
                  )}
                  <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
            onEndReached={handleEndReached} // Trigger loading of more Pokémon when scrolled to the bottom
            onEndReachedThreshold={0.5} // Trigger when 50% of the list is visible
            ListFooterComponent={
              isFetchingMore ? <ActivityIndicator size="small" /> : null // Show loading spinner when fetching more
            }
          />
        </View>
        <View style={styles.sideBorder} />
      </View>
      <BlackLine4 />

      {/* Bottom Red Footer */}
      <View style={styles.footer} />
      {/* Green Button */}
      <TouchableOpacity
        style={styles.greenButton}
        onPress={handleGreenButtonPress}
      >
        <Text style={styles.greenButtonText}>| | |</Text>
      </TouchableOpacity>
    </View>
  );
}
