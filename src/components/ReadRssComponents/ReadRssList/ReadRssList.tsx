import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, Platform, Pressable, Text, View} from 'react-native';

import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';

import RssModels from 'src/request/models/rssModels';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const rssModels = new RssModels();
const noListImg = require('src/assets/commom/noList.png');

const htmlparser2 = require('htmlparser2');
interface IProps {
  children?: React.ReactNode;
  route: {
    params: {
      url: string;
    };
  };
}
const ReadRssList = (props: IProps) => {
  const navigation = useNavigation();
  const appSettings = useAppSettings();
  const [rssData, setRssData] = useState<any>(undefined);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /***
   * 获取rss
   * @param url
   */
  const getRssFunction = async () => {
    const url = props.route.params.url;
    try {
      const resp = await rssModels.fetchGet(`${url}`);
      if (resp) {
        const parseResp = htmlparser2.parseFeed(String(resp));
        setRssData(parseResp);
      } else {
        setRssData({items: []});
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  useEffect(() => {
    getRssFunction();
  }, [props.route.params.url]);

  useEffect(() => {
    // console.log(rssData);
  }, [rssData]);

  // TODO 优化
  const parseDesc = (desc: string) => {
    // 去除html标签
    const str = String(desc).replace(/<[^>]*>|<\/[^>]*>/gm, '');
    return str;
  };

  // 点击单个跳转
  const clickItem = useCallback(
    (index: number) => {
      const data = rssData.items[index];
      const {link} = data;
      console.log('link', link);
      if (link) {
        // @ts-ignore
        navigation.navigate('TabListDetails', {url: link, title: rssData.title || '详情'});
      }
    },
    [navigation, rssData],
  );

  return (
    <View style={[styles.container, {backgroundColor: appSettings.colors.background}]}>
      {rssData !== undefined ? (
        // <SafeAreaView style={styles.rssListBox}>

        <FlatList
          onRefresh={async () => {
            setIsRefreshing(true);
            await getRssFunction();
            setIsRefreshing(false);
          }}
          // 在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的符号。
          refreshing={isRefreshing}
          data={rssData.items}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => clickItem(index)}
              android_ripple={{color: appSettings.colors.primary}}
              style={({pressed}) =>
                Platform.OS === 'ios'
                  ? {
                      opacity: pressed ? 0.8 : 1,
                      transform: pressed ? [{scale: 0.98}] : [{scale: 1}],
                    }
                  : {
                      transform: pressed ? [{scale: 0.98}] : [{scale: 1}],
                    }
              }>
              <View
                style={[
                  styles.rssListItemBox,
                  {
                    backgroundColor: appSettings.colors.card,
                  },
                ]}>
                <Text style={[{color: appSettings.colors.text}, styles.rssListItemContent_title]}>
                  {item.title}
                </Text>
                <Text style={{color: appSettings.colors.text}}>{parseDesc(item.description)}</Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item, idx) => String(idx)}
          // 指定除data外的属性 渲染用
          extraData={rssData}
          // 头部组件
          ListHeaderComponent={() => (
            <>
              {rssData?.title && (
                <View style={[styles.rssTopInfo, {borderColor: appSettings.colors.text}]}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{color: appSettings.colors.text}}>
                    {rssData?.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{
                      color: appSettings.colors.text,
                    }}>{`来源：${rssData?.link}`}</Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{color: appSettings.colors.text}}>
                    {`更新：${moment(rssData?.updated.toISOString()).format('YYYY-M-D')}`}
                  </Text>
                </View>
              )}
            </>
          )}
          // 列表为空时渲染该组件。
          ListEmptyComponent={() => (
            <View style={styles.noList}>
              <Image source={noListImg} />
              <Text style={{color: appSettings.colors.text, marginTop: 10}}>暂无数据</Text>
            </View>
          )}
        />
      ) : (
        // </SafeAreaView>
        <ActivityIndicator style={{flex: 1}} size="large" color={appSettings.colors.primary} />
      )}
    </View>
  );
};

export default ReadRssList;
