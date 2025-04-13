import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import styles from './styles';

import backgroundImage from '../../assets/Cloud.jpeg'; // Background image for the screen
import pokeballImage from '../../assets/Pokeball-Open.png'; // Pokéball image

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  route: DetailsScreenRouteProp;
}

const { width, height } = Dimensions.get('window');

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { name, types, stats, image } = route.params;

  return (
    <View style={styles.container}>
      {/* Background with Pokémon image */}
      <View style={styles.imageBackgroundContainer}>
        <ImageBackground source={backgroundImage} style={styles.imageBackground}>
          {/* Custom back button to navigate to previous screen */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()} // Navigate back to previous screen
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          {/* Display Pokémon types */}
          <View style={styles.type}>
            {types.map((type, index) => (
              <Text key={index} style={styles.typeText}>{type}</Text>
            ))}
          </View>

          {/* Display Pokémon image */}
          <Image source={{ uri: image }} style={styles.pokemonImage} />
        </ImageBackground>
      </View>

      {/* Display Pokémon stats */}
      <View style={styles.dataContainer}>
        <View style={styles.typesContainer}>
          <View style={styles.types}>
            <Text style={styles.pokemonName}>{name}</Text>
            {/* Display Pokéball image */}
            <Image source={pokeballImage} style={styles.pokeballImage} />
          </View>
        </View>

        {/* Stats display section */}
        <View style={styles.statsContainer}>
          <Text style={styles.title}>Stats</Text>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statContainer}>
              {/* Stat row with name, progress bar, and value */}
              <View style={styles.statRow}>
                <Text style={styles.statName}>{stat.name}</Text>
                <View style={styles.statBarContainer}>
                  <View
                    style={[
                      styles.statBar,
                      { width: `${stat.base_stat}%`, backgroundColor: getStatColor(stat.name) },
                    ]}
                  />
                </View>
                <Text style={styles.statValue}>{stat.base_stat}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

// Returns color based on stat type
const getStatColor = (statName: string) => {
  switch (statName.toLowerCase()) {
    case 'hp':
      return '#3b4cca';
    case 'attack':
      return '#A7D8F2';
    case 'defense':
      return '#3b4cca';
    case 'special-attack':
      return '#A7D8F2';
    case 'special-defense':
      return '#3b4cca';
    case 'speed':
      return '#A7D8F2';
    default:
      return '#3b4cca';
  }
};

export default DetailsScreen;
