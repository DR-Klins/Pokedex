import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './BackButton.styles';

// Props for BackButton component
interface BackButtonProps {
  onPress: () => void;
}

// reusable back button
const BackButton: React.FC<BackButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{"<"}</Text>
  </TouchableOpacity>
);

export default BackButton;
