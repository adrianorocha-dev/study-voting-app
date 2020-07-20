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
    padding: 10,
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
  inputGroup: {
    alignSelf: 'stretch',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  input: {
    alignSelf: 'stretch',
    padding: 5,
    marginVertical: 5,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#00000040',
    borderRadius: 5,
  },
  optionsInputContainer: {
    height: 44,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  optionsInput: {
    flex: 1,
    paddingHorizontal: 5,
    marginVertical: 5,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#00000040',
    borderRadius: 5,
  },
  optionsAddButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#0c93d2',
  },
  optionsListItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickDateModal: {
    flex: 1,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#0c93d2',
  },
  savingButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
