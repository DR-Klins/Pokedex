import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: '#fff',
  },
  value: {
    fontSize: 14,
    marginRight: 15,
    color: '#fff',
  },
  barContainer: {
    width: '50%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 5,
  },
});
