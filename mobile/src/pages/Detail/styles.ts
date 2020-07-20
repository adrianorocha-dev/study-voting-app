import { StyleSheet, Platform, Dimensions } from 'react-native';

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    ...boxShadow,
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  optionsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  optionResult: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    ...boxShadow,
  },
  resultPercentageGraph: {
    flex: 1,
    height: 10,
    position: 'absolute',
    backgroundColor: '#000000',
    zIndex: 5,
  },
  voteButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#0c93d2',
    marginTop: 10,
    ...boxShadow,
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
