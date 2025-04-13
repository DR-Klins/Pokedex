// utils/colors.ts
export const getStatColor = (statName: string) => {
    switch (statName.toLowerCase()) {
      case 'hp': return '#3b4cca';
      case 'attack': return '#A7D8F2';
      case 'defense': return '#3b4cca';
      case 'special-attack': return '#A7D8F2';
      case 'special-defense': return '#3b4cca';
      case 'speed': return '#A7D8F2';
      default: return '#3b4cca';
    }
  };
  