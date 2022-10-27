import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // info
  rssTopInfo: {
    paddingLeft: 10,
    paddingVertical: 10,
    borderLeftWidth: 5,
  },
  // list
  noList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
  },
  rssListBox: {
    flex: 1,
  },
  rssListItemBox: {
    padding: 20,
    // height: 180,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 6,
    elevation: 6,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  rssListItemContent_title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});
export default styles;
