import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Container for the entire layout
  container: {
    flex: 1,
    backgroundColor: '#d32f2f',
  },

  // Footer section
  footer: {
    height: '12%',
    backgroundColor: '#d32f2f',
  },

  // Wrapper for content layout
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#d32f2f',
  },

  // Side border for separation
  sideBorder: {
    width: 10,
    backgroundColor: '#d32f2f',
  },

  // Main content area with background and padding
  content: {
    flex: 1,
    backgroundColor: '#A7D8F2',
    padding: 10,
    marginHorizontal: 0.1, 
    borderRadius: 8,    
    borderTopEndRadius: 0,
  },

  // Top section of the retro Pokédex
  pokedexTop: {
    height: '17%',
    backgroundColor: '#d32f2f',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    width: "100%",  
  },

  // Outer lens container in the Pokédex
  lensOuter: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#1565c0',
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Inner lens in the Pokédex
  lensInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#bbdefb',
  },

  // Row for the indicator lights at the top
  indicatorRow: {
    flexDirection: 'row',
    gap: 8,
  },

  // Green indicator light
  indicatorLightGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: '#fff',
  },

  // Red indicator light
  indicatorLightRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#fff',
  },

  // Yellow indicator light
  indicatorLightYellow: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'yellow',
    borderWidth: 1,
    borderColor: '#fff',
  },

  // Horizontal line 1 for the Pokédex
  line1: {
    position: 'absolute',
    top: '15.5%',    
    height: 5,       
    backgroundColor: '#8B0000',
    width: '30%',   
    zIndex: 2,
  },

  // Vertical line 2 for the Pokédex
  line2: {
    position: 'absolute',
    top: '11.7%',   
    left: '30%',     
    height: '4.4%',   
    width: 5,        
    backgroundColor: '#8B0000',
    zIndex: 2,
  },

  // Horizontal line 3 for the Pokédex
  line3: {
    position: 'absolute',
    top: '11.5%',    
    left: "30%",
    height: 5,       
    backgroundColor: '#8B0000',
    width: '100%',   
    zIndex: 2,
  },

  // Bottom horizontal line 4 for the Pokédex
  line4: {
    position: 'absolute',
    bottom: '15.5%',    
    height: 5,       
    backgroundColor: '#8B0000',
    width: '100%',    
    zIndex: 2,
  },

  // Search bar container with positioning
  searchBarContainer: {
    position: 'absolute',
    top: '13.1%',
    right: 10.5,
    width: '65%',
    zIndex: 2,
  },

  // Style for the search bar itself
  searchBar: {
    height: 36,
    borderRadius: 8,
    marginBottom: 10, 
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 12,
    backgroundColor: '#A7D8F2',
    fontSize: 12,
    fontFamily: 'Roboto',
    letterSpacing: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  // Card for displaying Pokémon info
  card: {
    backgroundColor: '#dbe4c6',
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 12,
    padding: 10,           
    marginBottom: 15,     
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',   
    paddingRight: 15,       
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  // Image of the Pokémon
  pokemonImage: {
    width: 70,
    height: 70,
    marginRight: 150,
  },       

  // Name of the Pokémon in the card
  name: {
    fontSize: 18,
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
    color: '#111',
    fontWeight: 'bold',
    textAlign: 'center',    
    flex: 1,  
    marginBottom: 5,              
  },

  // Positioning for the Poké Ball image
  pokeballContainer: {
    position: 'absolute',
    top: '40%',  
    right: '61%',
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Style for the Poké Ball image
  pokeballImage: {
    width: 65,  
    height: 65, 
    transform: [{ rotate: '20deg' }],
  },

  // Green button style for actions
  greenButton: {
    backgroundColor: '#00C000',
    bottom: "5%",
    left: "60%",
    alignItems: 'center',
    justifyContent: 'center',
    width: "35%",
    height: "5%",
    borderRadius: 5,
  },

  // Text style for the green button
  greenButtonText: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Container for the types of the Pokémon
  typesContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    marginTop: 5,
    alignItems: 'center',
  },

  // Style for each type text label
  typeText: {
    backgroundColor: 'black', 
    color: 'white',
    paddingVertical: 2,
    paddingHorizontal: 6,
    margin: 2,
    borderRadius: 4,
    fontSize: 12,
  },

  // Column container for elements aligned to the right
  columnContainer: {
    flexDirection: 'column', 
    alignItems: 'flex-end', 
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },

});

export default styles;
