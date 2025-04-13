import React from 'react';
import { Image, ImageStyle } from 'react-native';
import fallbackImage from '../assets/fallback.png';

// Props for the PokemonImage component
interface PokemonImageProps {
  image?: string;           //  image URL from API
  style: ImageStyle;        // Style to apply to the Image component
}

// Displays a Pokémon image using the provided URL or a fallback image
const PokemonImage: React.FC<PokemonImageProps> = ({ image, style }) => (
  <Image source={image ? { uri: image } : fallbackImage} style={style} />
);

export default PokemonImage;
