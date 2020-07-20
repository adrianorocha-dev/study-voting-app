import { StyleSheet, Dimensions, Platform } from 'react-native';

const boxShadow =
  Platform.OS === 'ios'
    ? {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
      }
    : { elevation: 5 };

export default StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.8,
    backgroundColor: '#0c93d2',
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    borderRadius: 10,
    ...boxShadow,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  textBold: {
    fontWeight: '700',
  },
});
