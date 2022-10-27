import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    // backgroundColor: 'rgba(61,59,79, .6)',
  },
  modalView: {
    margin: 20,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  ButtonBox: {
    flexDirection: 'row',
    marginTop: 20,
  },
  openButton: {
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    marginHorizontal: 20,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default styles;
