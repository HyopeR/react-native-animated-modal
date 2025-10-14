import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    gap: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center',
  },
  description: {
    fontWeight: 400,
    lineHeight: 20,
    textAlign: 'center',
  },
  action: {
    gap: 10,
    marginTop: 5,
  },
  section: {
    padding: 10,
    backgroundColor: '#F2F2F2',
    marginHorizontal: 4,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 8,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
