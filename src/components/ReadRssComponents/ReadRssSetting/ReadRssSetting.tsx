import React, {useEffect, useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import AppHeader from '@components/commom/AppHeader/AppHeader';
import {STORAGE_KEYS, storageGetData, storageSetData} from 'src/utils/storage';
import AppList from '@components/commom/AppList/AppList';
import AppCardPressAble from '@components/commom/AppCardPressAble/AppCardPressAble';
import AppModal from '@components/commom/AppModal/AppModal';
import Feather from 'react-native-vector-icons/Feather';

const ReadRssSetting = () => {
  const appSettings = useAppSettings();
  // const route = useRoute();
  const [rssFeedsList, setRssFeedsList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [delModalVisible, setDelModalVisible] = useState(false);
  const [delContent, setDelContent] = useState<{name: string; url: string; index: number} | null>(
    null,
  );

  const [inputValue, setInputValue] = useState({
    name: '',
    url: '',
  });

  useEffect(() => {
    getRssList();
  }, []);

  const getRssList = async () => {
    const list = await storageGetData(`${STORAGE_KEYS.RSS_LIST}`);
    list && setRssFeedsList(list);
  };

  const setRssList = async () => {
    if (inputValue.name.length > 0 && inputValue.url.length > 0) {
      const data = [...rssFeedsList, inputValue];
      await storageSetData(`${STORAGE_KEYS.RSS_LIST}`, data);
      setModalVisible(false);
      setInputValue({name: '', url: ''});
      await getRssList();
    } else {
      Alert.alert('请输入完整');
    }
  };

  const openModal = (data: {name: string; url: string}, idx: number) => {
    setDelContent({...data, index: idx});
    setDelModalVisible(true);
  };

  useEffect(() => {
    console.log(rssFeedsList);
  }, [rssFeedsList]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: appSettings.colors.background,
        },
      ]}>
      <AppHeader
        title={'Rss配置'}
        renderRight={<Feather name={'plus'} size={30} color={appSettings.colors.text} />}
        onRightPress={() => setModalVisible(true)}
      />

      <View
        style={{
          padding: 10,
          flex: 1,
        }}>
        <AppList
          appListData={rssFeedsList}
          keyExtractor={(item, idx) => String(idx)}
          renderItem={({item, index}) => (
            <AppCardPressAble
              style={{
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 6,
              }}
              onPress={() => {
                openModal(item, index);
              }}>
              <>
                <Text style={[styles.rssListItem, {color: appSettings.colors.text}]}>
                  标签: {item?.name}
                </Text>
                <Text style={[styles.rssListItem, {color: appSettings.colors.text}]}>
                  URL: {item?.url}
                </Text>
              </>
            </AppCardPressAble>
          )}
        />
      </View>

      {/* 添加 */}
      <AppModal
        okFun={() => setRssList()}
        closeFun={() => setModalVisible(false)}
        visible={modalVisible}>
        <View style={{width: 300}}>
          <View style={{width: 300}}>
            <View style={styles.inputRow}>
              <Text style={{color: appSettings.colors.text}}>标签:</Text>
              <TextInput
                style={[styles.inputStyle, {backgroundColor: appSettings.colors.background}]}
                onChangeText={name => setInputValue({...inputValue, name})}
                value={inputValue.name}
                placeholder={'输入订阅Tab的标签'}
                clearButtonMode={'while-editing'}
                autoCorrect={false}
                keyboardAppearance={appSettings.theme === 'light' ? 'light' : 'dark'}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <Text style={{color: appSettings.colors.text}}>链接:</Text>
            <TextInput
              style={[styles.inputStyle, {backgroundColor: appSettings.colors.background}]}
              onChangeText={url => setInputValue({...inputValue, url})}
              value={inputValue.url}
              placeholder={'输入订阅https链接'}
              clearButtonMode={'while-editing'}
              autoCorrect={false}
              keyboardAppearance={appSettings.theme === 'light' ? 'light' : 'dark'}
            />
          </View>
        </View>
      </AppModal>

      {/* 删除 */}
      <AppModal
        okFun={async () => {
          const data = rssFeedsList.filter((item, index) => index !== Number(delContent!.index));
          await storageSetData(`${STORAGE_KEYS.RSS_LIST}`, data);
          setDelModalVisible(false);
          await getRssList();
        }}
        closeFun={() => setDelModalVisible(false)}
        visible={delModalVisible}>
        <View style={{width: 300}}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
            是否删除{delContent?.name || '无名称'}
          </Text>
        </View>
      </AppModal>
    </View>
  );
};

export default ReadRssSetting;
