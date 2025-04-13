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
import { Stat, Pokemon } from '../../types';
import { fetchPokemonList, fetchPokemonDetails } from '../../api/pokeapi';
import styles from './styles';

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { width, height } = Dimensions.get('window');
  const Stack = createStackNavigator();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Fetch initial Pokémon data when the component mounts
  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    if (isFetchingMore || !hasMore) return;
  
    setIsFetchingMore(true);
    const limit = 40;
  
    try {
      // Fetch the list of Pokémon names
      const data = await fetchPokemonList(currentId - 1, limit);
  
      // Fetch detailed data for each Pokémon
      const detailResponses = await Promise.all(
        data.results.map((poke: { url: string }) => fetchPokemonDetails(poke.url))
      );
  
      // Map detailed data to fit the Pokémon interface
      const newPokemonList: Pokemon[] = detailResponses.map((data) => {
        const image =
          data.sprites?.other?.['official-artwork']?.front_default ||
          data.sprites?.front_default;
  
        const types = data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name);
  
        const stats: Stat[] = data.stats.map((statInfo: { base_stat: number; stat: { name: string } }) => ({
          name: statInfo.stat.name,
          base_stat: statInfo.base_stat,
        }));
  
        return {
          id: data.id,
          name: data.name,
          image,
          types,
          stats,
        };
      });
  
      // If no new Pokémon are fetched, disable further fetching
      if (newPokemonList.length === 0) setHasMore(false);
  
      // Update the Pokémon list
      setPokemon((prev) => [...prev, ...newPokemonList]);
  
      // Increment ID to fetch the next batch
      setCurrentId((prev) => prev + limit);
  
      setLoading(false);
    } catch (err) {
      console.warn('Error loading Pokémon:', err);
      setHasMore(false); // Disable further fetching on error
    } finally {
      setIsFetchingMore(false); // Reset fetching state
    }
  };
  

  const handleEndReached = useCallback(() => {
    if (!isFetchingMore && hasMore) {
      loadPokemon();
    }
  }, [isFetchingMore, hasMore]);

  // Filter Pokémon list based on search text
  const filteredData = searchText
    ? pokemon.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : pokemon;

  if (loading && pokemon.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;
  }

  // Render horizontal lines for UI design
  const BlackLine1 = () => <View style={styles.line1} />;
  const BlackLine2 = () => <View style={styles.line2} />;
  const BlackLine3 = () => <View style={styles.line3} />;
  const BlackLine4 = () => <View style={styles.line4} />;

  const handleGreenButtonPress = () => {
    console.log('Green button pressed');
  };

  const handleCardPress = (item: Pokemon) => {
    // Trigger animation before navigating to the Pokémon details screen
    const scale = new Animated.Value(1);

    Animated.timing(scale, {
      toValue: 1.2,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Navigate to the Details screen with selected Pokémon data
      navigation.navigate('Details', {
        name: item.name,
        stats: item.stats,
        types: item.types,
        image: item.image,
      });
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
  
      {/* Pokédex Top UI */}
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
  
      {/* Pokémon List */}
      <View style={styles.contentWrapper}>
        <View style={styles.sideBorder} />
        <View style={styles.content}>
          <FlashList
            data={filteredData}
            estimatedItemSize={120}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const imageOpacity = new Animated.Value(0);

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
                  onPress={() => handleCardPress(item)} // Navigate to details with animation
                >
                  <View style={styles.pokeballContainer}>
                    <FastImage
                      source={require('../../assets/pokeball.png')}
                      style={styles.pokeballImage}
                    />
                  </View>
                  {item.image && (
                    <Animated.View style={{ opacity: imageOpacity }}>
                      <FastImage
                        source={{ uri: item.image }}
                        style={styles.pokemonImage}
                        resizeMode={FastImage.resizeMode.contain}
                        onLoad={onLoad}
                      />
                    </Animated.View>
                  )}
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
              );
            }}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingMore ? <ActivityIndicator size="small" /> : null
            }
          />
        </View>
        <View style={styles.sideBorder} />
      </View>
      <BlackLine4 />
  
      <View style={styles.footer} />
      <TouchableOpacity
        style={styles.greenButton}
        onPress={handleGreenButtonPress}
      >
        <Text style={styles.greenButtonText}>| | |</Text>
      </TouchableOpacity>
    </View>
  );
}
