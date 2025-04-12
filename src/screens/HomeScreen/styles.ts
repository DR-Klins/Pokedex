import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Main layout
  container: {
    flex: 1,
    backgroundColor: '#d32f2f',
  },
  footer: {
    height: '12%',
    backgroundColor: '#d32f2f',
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#d32f2f',
  },
  sideBorder: {
    width: 10,
    backgroundColor: '#d32f2f',
  },
  content: {
    flex: 1,
    backgroundColor: '#A7D8F2',
    padding: 10,
    marginHorizontal: 0.1, 
    borderRadius: 8,    
    borderTopEndRadius:0,
  },

  // Retro Pokédex top section  
  pokedexTop: {
    height: '17%',
    backgroundColor: '#d32f2f',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    width: "100%",  
  },
  
  // Lens top section
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
  lensInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#bbdefb',
  },

  // Indicators Light top
  indicatorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  indicatorLightGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: '#fff',
  },
  indicatorLightRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#fff',
  },
  indicatorLightYellow: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'yellow',
    borderWidth: 1,
    borderColor: '#fff',
  },

  // Pokedex Lines
  line1: {
    position: 'absolute',
    top: '15.5%',    
    height: 2,       
    backgroundColor: 'black',
    width: '30%',   
    zIndex: 2,
  },
  line2: {
    position: 'absolute',
    top: '11.7%',   
    left: '30%',     
    height: '4%',   
    width: 2,        
    backgroundColor: 'black',
    zIndex: 2,
  },
  line3: {
    position: 'absolute',
    top: '11.5%',    
    left: "30%",
    height: 2,       
    backgroundColor: 'black',
    width: '100%',   
    zIndex: 2,
  },
  line4: {
    position: 'absolute',
    bottom: '15.5%',    
    height: 2,       
    backgroundColor: 'black',
    width: '100%',    
    zIndex: 2,
  },

  // Search bar positioning
  searchBarContainer: {
    position: 'absolute',
    top: '13.1%',
    right: 10.5,
    width: '65%',
    zIndex: 2,
  },
  searchBar: {
    height: 36,
    borderRadius: 8,
    marginBottom: 10, 
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    paddingHorizontal: 12,
    backgroundColor: '#A7D8F2',
    fontSize: 12,
    fontFamily: 'Roboto',
    letterSpacing: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  // Pokémon card
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
  pokemonImage: {
    width: 70,
    height: 70,
    marginRight: 150,
  },       
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
  // Poké Ball
  pokeballContainer: {
    position: 'absolute',
    top: '40%',  
    right: '61%',
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pokeballImage: {
    width: 65,  
    height: 65, 
    transform: [{ rotate: '20deg' }],
  },
  //Green Button
  greenButton: {
    backgroundColor: '#00C000',
    bottom: "5%",
    left: "60%",
    alignItems: 'center',
    justifyContent: 'center',
    width:"35%",
    height: "5%",
    borderRadius: 5,
  },
  greenButtonText: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: 'bold',
  },
  typesContainer: {
    flexDirection: 'row', // Arrange types horizontally
    flexWrap: 'wrap', // Allow wrapping of types if there are multiple
    justifyContent: 'center', // Center types horizontally
    marginTop: 5,
    alignItems:'center',
  },
  typeText: {
    backgroundColor: 'black', // Example background color for type
    color: 'white',
    paddingVertical: 2,
    paddingHorizontal: 6,
    margin: 2,
    borderRadius: 4,
    fontSize: 12,

  },
  columnContainer:{
    flexDirection: 'column', // Stack name and types vertically
    alignItems: 'flex-end', // Center name and types horizontally
  }
});

export default styles;
