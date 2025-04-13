import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    imageBackgroundContainer: {
      height: height * 0.5,
      width: width,
      overflow: 'hidden',
      position: 'relative',
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pokemonName: {
        position: 'absolute',
        fontSize: 32, // Larger font size for better visibility
        fontWeight: 'bold',
        color: 'yellow', // Text color
        textShadowColor: 'rgba(5, 3, 3, 0.8)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow offset for depth
        textShadowRadius: 5, // Shadow blur radius
        letterSpacing: 2, // Add space between letters for a stylish effect
        textAlign: 'left', // Align text to the left
        fontFamily: 'Arial', // Replace with a custom font if you have one
        textTransform: 'uppercase', // Make the name all uppercase for consistency
      },
      
    pokemonImage: {
      width: 200,
      height: 200,
      position: 'absolute',
      top: '70%',
      transform: [{ translateY: -100 }],
    },
    backButton: {
        position: 'absolute', // Position the back button at the top-left
        top: 30,  // Adjust vertical position
        left: 20, // Adjust horizontal position
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent background for visibility
        borderRadius: 5, // Rounded corners
      },
      backButtonText: {
        color: '#fff', // White text for visibility
        fontSize: 18,
        fontWeight: 'bold',
      },
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
    typesContainer: {
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',  // Aligns the types and Pokéball horizontally
      position: 'relative',
    },
    type: {
        bottom:"37%",
        left:"40%",
        flexDirection: 'column',
        alignItems: 'flex-end',  // Aligns the types and Pokéball horizontally
        position: 'relative',
      },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color:"white",
      textTransform: 'uppercase',
    },
    types: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      textTransform: 'uppercase',
    },
    typeText: {
      backgroundColor: '#FFEA00',
      margin: 5,
      padding: 8,
      borderRadius: 12,
      fontSize: 12,
      textTransform: 'uppercase',
    },
    pokeballImage: {
        position: 'absolute',
        width: 150,
        height: 120,
        marginLeft: 220, // Adds space between the types and the Pokéball image
        marginTop:-20,
        transform: [
            { translateY: -45 }, // Moves the image upwards
            { scaleX: -1 }, // Flips the image horizontally
            { rotate: '-30deg' }, // Adds a tilt effect (change the degree value to adjust the tilt)
          ],
      },
      
    statsContainer: {
      marginTop: 60,
    },
    statContainer: {
      marginBottom: 15,
    },
    statRow: {
      flexDirection: 'row',
      alignItems: 'center', // Align items vertically in the middle
      justifyContent: 'space-between', // Ensure spacing between elements
    },
    statName: {
      fontSize: 12,
      fontWeight: 'bold',
      flex: 1, // This allows the stat name to take up available space
      textTransform: 'uppercase',
    },
    statBarContainer: {
      width: '50%', // Limit the bar width
      height: 10,
      backgroundColor: '#e0e0e0',
      borderRadius: 5,
      overflow: 'hidden',
    },
    statBar: {
      height: '100%',
      borderRadius: 5,
    },
    statValue: {
      fontSize: 14,
      marginLeft: 10, // Space between bar and value
    },
  });
  
  export default styles;
  