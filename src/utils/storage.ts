import AsyncStorage from '@react-native-async-storage/async-storage';

/** - RSS_LIST - rss订阅列表 */
export const STORAGE_KEYS = {
  RSS_LIST: 'RSS_LIST',
};

const storageSetData = async (
  key: string,
  value: Record<string, any> | Record<string, any>[] | [],
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`${key}`, jsonValue);
  } catch (e) {
    // saving error
    console.log(`setData error: ${String(e)}`);
  }
};

const storageGetData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(`getData error: ${String(e)}`);
  }
};

export {storageSetData, storageGetData};
