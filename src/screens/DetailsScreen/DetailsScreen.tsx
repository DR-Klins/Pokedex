import React, { useMemo, useCallback, useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { getStatColor } from '../../utils/colors';

import styles from './styles';

// Asset imports
import backgroundImage from '../../assets/Cloud.jpeg';
import pokeballImage from '../../assets/Pokeball-Open.png';

// Reusable UI components
import BackButton from '../../components/BackButton';
import TypeList from '../../components/TypeList';
import PokemonImage from '../../components/PokemonImage';
import StatRow from '../../components/StatRow';

// Type for route parameters
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  route: DetailsScreenRouteProp;
}

const { width, height } = Dimensions.get('window');

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  // Local state to handle unexpected rendering errors
  const [hasError, setHasError] = useState(false);

  // Memoized function to handle back navigation to improve performance
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  let content;

  try {
    // Safely extract Pokémon data from navigation route params with fallbacks
    const {
      name = 'Unknown',
      types = [],
      stats = [],
      image = ''
    } = route.params || {};

    // Use memoization to optimize stat color calculation
    const memoizedStats = useMemo(() => {
      return stats.map((stat) => ({
        ...stat,
        color: getStatColor(stat.name),
      }));
    }, [stats]);

    // Main screen content (split into upper and lower sections)
    content = (
      <>
        {/* Top section with background, back button, types, and Pokémon image */}
        <View style={styles.imageBackgroundContainer}>
          <ImageBackground source={backgroundImage} style={styles.imageBackground}>
            <BackButton onPress={handleGoBack} />
            <View style={styles.type}>
              <TypeList types={types} />
            </View>
            <PokemonImage image={image} style={styles.pokemonImage} />
          </ImageBackground>
        </View>

        {/* Bottom section with Pokémon name and stats */}
        <View style={styles.dataContainer}>
          {/* Name and decorative Pokéball */}
          <View style={styles.typesContainer}>
            <View style={styles.types}>
              <Text style={styles.pokemonName}>{name}</Text>
              <Image source={pokeballImage} style={styles.pokeballImage} />
            </View>
          </View>

          {/* Stat bars */}
          <View style={styles.statsContainer}>
            <Text style={styles.title}>Stats</Text>
            {memoizedStats.map((stat, index) => (
              <StatRow
                key={index}
                name={stat.name}
                value={stat.base_stat}
                color={stat.color}
              />
            ))}
          </View>
        </View>
      </>
    );
  } catch (error) {
    // If rendering fails for any reason, log and show a fallback UI
    console.error('Error rendering DetailsScreen:', error);

    content = (
      <View style={styles.container}>
        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center', marginTop: 40 }}>
          Oops! Something went wrong while loading the Pokémon details.
        </Text>
        <BackButton onPress={handleGoBack} />
      </View>
    );
  }

  // Render final content (normal or error fallback)
  return <View style={styles.container}>{content}</View>;
};

export default DetailsScreen;
