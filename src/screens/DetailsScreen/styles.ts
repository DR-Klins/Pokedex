import { StyleSheet, Dimensions } from 'react-native';

// Get device width and height for responsive layout
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Root container
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Container for the upper half background image section
  imageBackgroundContainer: {
    height: height * 0.5,
    width: width,
    overflow: 'hidden',
    position: 'relative',
  },

  // Styles for the ImageBackground content
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Styles for the Pokémon name display
  pokemonName: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(5, 3, 3, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    letterSpacing: 2,
    textAlign: 'left',
    fontFamily: 'Arial',
    textTransform: 'uppercase',
  },

  // Styling the Pokémon image positioned over the background
  pokemonImage: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: '70%',
    transform: [{ translateY: -100 }],
  },

  // Bottom section container for stats and name info
  dataContainer: {
    flex: 1,
    backgroundColor: '#d32f2f',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    marginTop: -30,
    paddingBottom: 40,
    borderTopWidth: 10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderColor: '#8B0000',
    position: 'relative',
  },

  // Container for name and Pokéball image
  typesContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },

  // Overlay container for displaying types over background
  type: {
    bottom: '37%',
    left: '40%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'relative',
  },

  // Section heading Stats
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textTransform: 'uppercase',
  },

  // Row container for type labels
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    textTransform: 'uppercase',
  },

  // Decorative Pokéball image next to Pokémon name
  pokeballImage: {
    position: 'absolute',
    width: 150,
    height: 120,
    marginLeft: 220,
    marginTop: -20,
    transform: [
      { translateY: -45 },
      { scaleX: -1 }, 
      { rotate: '-30deg' },
    ],
  },

  // Container for the list of stat 
  statsContainer: {
    marginTop: 60,
  },

  // Wrapper for individual stat
  statContainer: {
    marginBottom: 15,
  },
});

export default styles;
