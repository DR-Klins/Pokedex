import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Pokemon } from '../../types';
import { fetchPokemonList, fetchPokemonDetails } from '../../api/pokeapi';
import styles from './styles';

export default function HomeScreen() {
  // State hooks for managing Pokemon data, search input, loading, pagination, etc.
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { width, height } = Dimensions.get('window');
  const Stack = createStackNavigator();

  // Navigation hook for handling screen navigation
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Effect hook to fetch initial Pokemon data when component mounts
  useEffect(() => {
    loadPokemon();
  }, []);

  // Asynchronous function to fetch the list and details of Pokémon from the API
  const loadPokemon = async () => {
    if (isFetchingMore || !hasMore) return; // Prevent multiple fetches while one is in progress

    setIsFetchingMore(true);
    const limit = 40; // Set limit for number of Pokémon to load in one batch

    try {
        // Fetch Pokémon names/URLs for the current batch
        const data = await fetchPokemonList(currentId - 1, limit);

        // Fetch detailed information (sprites, stats, types, etc.) for each Pokémon
        const detailResponses = await Promise.all(
            data.results.map((poke: { url: string }) => fetchPokemonDetails(poke.url))
        );

        // Map API responses to Pokémon objects with necessary data
        const newPokemonList: Pokemon[] = detailResponses.map((data) => {
            const image =
                data.sprites?.other?.['official-artwork']?.front_default ||
                data.sprites?.front_default;

            const types = data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name);
            const stats = data.stats.map((statInfo: { base_stat: number; stat: { name: string } }) => ({
                name: statInfo.stat.name,
                base_stat: statInfo.base_stat,
            }));

            return {
                id: data.id,
                name: data.name,
                image,
                types, // Add types to the Pokémon object
                stats, // Add stats to the Pokémon object
            };
        });

        // Update state if no new Pokémon are fetched, and disable further fetching
        if (newPokemonList.length === 0) setHasMore(false);

        // Append the newly fetched Pokémon to the existing list
        setPokemon((prev) => [...prev, ...newPokemonList]);
        setCurrentId((prev) => prev + limit); // Increment ID for the next fetch
        setLoading(false);
    } catch (err) {
        // Handle errors during the API request
        console.warn('Error loading Pokémon:', err);
        setHasMore(false); // Disable further fetching in case of an error
    } finally {
        setIsFetchingMore(false); // Reset fetching state after operation is complete
    }
};


  // Callback function to load more Pokémon when the user reaches the end of the list
  const handleEndReached = useCallback(() => {
    if (!isFetchingMore && hasMore) {
      loadPokemon(); // Fetch more Pokémon if available
    }
  }, [isFetchingMore, hasMore]);

  // Filter the Pokémon list based on the search text
  const filteredData = searchText
    ? pokemon.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : pokemon;

  // Show a loading spinner if the initial data is being fetched
  if (loading && pokemon.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;
  }

  // Component to render the black lines for styling
  const BlackLine1 = () => <View style={styles.line1} />;
  const BlackLine2 = () => <View style={styles.line2} />;
  const BlackLine3 = () => <View style={styles.line3} />;
  const BlackLine4 = () => <View style={styles.line4} />;

  // Function to handle the green button press action
  const handleGreenButtonPress = () => {
    console.log('Green button pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
  
      {/* Retro Pokédex Top Design */}
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
  
      {/* Search Bar for Filtering Pokémon */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Pokémon"
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>
  
      {/* Content Area for displaying Pokémon list */}
      <View style={styles.contentWrapper}>
        <View style={styles.sideBorder} />
        <View style={styles.content}>
          <FlashList
            data={filteredData} // Render filtered Pokémon data
            estimatedItemSize={120} // Optimized rendering for large lists
            keyExtractor={(item) => item.id.toString()} // Unique key based on Pokémon ID
            renderItem={({ item }) => {
              const imageOpacity = new Animated.Value(0); // Animation for image opacity
  
              // Function to trigger the image fade-in animation on load
              const onLoad = () => {
                Animated.timing(imageOpacity, {
                  toValue: 1, // Fade the image to full opacity
                  duration: 400,
                  useNativeDriver: true,
                }).start();
              };
  
              return (
                <TouchableOpacity style={styles.card}>
                  <View style={styles.pokeballContainer}>
                    <FastImage
                      source={require('../../assets/pokeball.png')} // Poké Ball image for decoration
                      style={styles.pokeballImage}
                    />
                  </View>
                  {item.image && (
                    <Animated.View style={{ opacity: imageOpacity }}>
                      <FastImage
                        source={{ uri: item.image }}
                        style={styles.pokemonImage}
                        resizeMode={FastImage.resizeMode.contain}
                        onLoad={onLoad} // Trigger image fade-in on load
                      />
                    </Animated.View>
                  )}
                  <View style={styles.columnContainer}>
                  {/* Pokémon Name */}
                  <Text style={styles.name}>{item.name}</Text>
            
                  {/* Pokémon Types - Placed below the name */}
                  <View style={styles.typesContainer}>
                    {item.types.map((type, index) => (
                      <Text key={index} style={styles.typeText}>
                        {type}
                      </Text>
                    ))}
                  </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            onEndReached={handleEndReached} // Load more Pokémon when the end of the list is reached
            onEndReachedThreshold={0.5} // Trigger loading when 50% of the list is visible
            ListFooterComponent={
              isFetchingMore ? <ActivityIndicator size="small" /> : null // Show a loading spinner while fetching more Pokémon
            }
          />
        </View>
        <View style={styles.sideBorder} />
      </View>
      <BlackLine4 />
  
      {/* Bottom Red Footer */}
      <View style={styles.footer} />
      {/* Green Button for custom action */}
      <TouchableOpacity
        style={styles.greenButton}
        onPress={handleGreenButtonPress}
      >
        <Text style={styles.greenButtonText}>| | |</Text>
      </TouchableOpacity>
    </View>
  );
  
}
