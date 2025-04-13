import React from 'react';
import { View, Text } from 'react-native';
import styles from './TypeList.styles';

// Props for the TypeList component
interface TypeListProps {
  types: string[]; // Array of types of the Pokemon
}

// Renders a horizontal list of Pokémon types
const TypeList: React.FC<TypeListProps> = ({ types }) => (
  <View style={styles.container}>
    {types.map((type, index) => (
      <Text key={index} style={styles.typeText}>{type}</Text>
    ))}
  </View>
);

export default TypeList;
