import {StyleSheet} from 'react-native';

export const PageStyle = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
  },
  body: {
    flex: 1,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export const ConfigStyle = StyleSheet.create({
  root: {
    flexDirection: 'column',
    rowGap: 8,
  },
  row: {
    minHeight: 50,
    flexDirection: 'row',
    columnGap: 4,
  },
  column: {
    flex: 0.4,
    justifyContent: 'center',
  },
  columnRow: {
    flex: 0.6,
    flexDirection: 'row',
    columnGap: 4,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemActive: {
    backgroundColor: '#55a6ff',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export const ModalStyle = StyleSheet.create({
  root: {
    width: 320,
    height: 240,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center',
    lineHeight: 32,
  },
  description: {
    fontWeight: 400,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  footer: {},
});

export const ListStyle = StyleSheet.create({
  section: {
    padding: 10,
    backgroundColor: '#55a6ff',
    marginHorizontal: 4,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  item: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    marginBottom: 8,
    marginHorizontal: 4,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
