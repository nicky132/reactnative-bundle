import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  controlList: {
    flex: 1,
    padding: 20,
  },
  controlListItem: {
    padding: 20,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlListItemText: {
    fontWeight: 'bold',
    // fontSize: 16,
  },
});
export default styles;
