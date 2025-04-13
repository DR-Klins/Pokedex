import React from 'react';
import { View, Text } from 'react-native';
import styles from './StatRow.styles';

// Props for the StatRow component
interface StatRowProps {
  name: string;   // Name of the stat
  value: number;  // Base value of the stat
  color: string;  // Color used to fill the stat bar
}

// Renders a single stat row with name, value, and a colored progress bar
const StatRow: React.FC<StatRowProps> = ({ name, value, color }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.value}>{value}</Text>
    <View style={styles.barContainer}>
      <View style={[styles.bar, { width: `${value}%`, backgroundColor: color }]} />
    </View>
  </View>
);

export default StatRow;
