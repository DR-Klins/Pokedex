import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#333',
    marginTop: 4,
  },
  
});

export default styles;
