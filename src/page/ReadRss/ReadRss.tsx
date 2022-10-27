import React, {FC, useState} from 'react';
import {ActivityIndicator, Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ReadRssList from '@components/ReadRssComponents/ReadRssList/ReadRssList';
import {STORAGE_KEYS, storageGetData} from '../../utils/storage';
import {useFocusEffect} from '@react-navigation/native';

const noListImg = require('src/assets/commom/noList.png');

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

// const mockrss = [
//   {
//     name: '阮一峰阮一峰阮一峰',
//     url: 'https://www.ruanyifeng.com/blog/atom.xml',
//   },
//   {name: 'ASDFGHJKL', url: 'https://coolshell.cn/feed'},
//   {name: 'gaojuqian', url: 'https://www.gaojuqian.com/index.php/feed/'},
//   {name: 'Movie-s', url: 'https://www.1895m.com/feed/'},
// ];

const TabList: FC = () => {
  const appSettings = useAppSettings();
  const [rssTabList, setRssTabList] = useState([]);

  useFocusEffect(() => {
    (async () => {
      const list = await storageGetData(`${STORAGE_KEYS.RSS_LIST}`);
      setRssTabList(list || []);
    })();
  });

  return (
    <>
      {rssTabList.length > 0 ? (
        <Tab.Navigator
          screenOptions={({route}) => ({
            // 活动
            tabBarActiveTintColor: appSettings.colors.primary,
            // 非活动
            tabBarInactiveTintColor: appSettings.colors.text,
            tabBarStyle: {
              backgroundColor: appSettings.colors.background,
              elevation: 1,
            },
            // 单个选项卡项的样式对象。
            tabBarItemStyle: {
              backgroundColor: appSettings.colors.background,
              flex: 1,
            },
            // 标签标签的样式对象。
            tabBarLabelStyle: {
              fontWeight: 'bold',
            },
            // 指示是否使制表符栏可滚动。
            tabBarScrollEnabled: rssTabList.length > 3 ? true : false,
            tabBarIndicator: props => <TouchableOpacity {...props} />,
            // 按压选项卡的不透明度（仅限iOS和Android < 5.0）。
            tabBarPressOpacity: 0.5,
            // 材料涟漪的颜色（仅限Android >= 5.0）。
            tabBarPressColor: appSettings.colors.primary,
            // 指示是否启用轻扫手势。
            swipeEnabled: true,
            lazy: true,
            lazyPlaceholder: () => (
              <View style={{flex: 1, backgroundColor: appSettings.colors.background}}>
                <ActivityIndicator
                  style={{flex: 1}}
                  size="large"
                  color={appSettings.colors.primary}
                />
              </View>
            ),
          })}>
          {rssTabList?.map((rssListItem: {name: string; url: string}, rssListIdx) => (
            <Tab.Screen
              name={rssListItem.name}
              component={ReadRssList}
              key={rssListIdx}
              initialParams={{url: rssListItem.url}}
            />
          ))}
        </Tab.Navigator>
      ) : (
        <View style={styles.noList}>
          <Image source={noListImg} />
          <Text style={{color: appSettings.colors.text, marginTop: 10}}>暂无数据</Text>
        </View>
      )}
    </>
  );
};

export const stackRouter = [
  {name: 'TabList', options: {headerShown: false}, component: TabList},
  // {
  //   name: 'TabListDetails',
  //   options: {headerShown: false},
  //   component: require('src/components/ReadRssComponents/ReadRssDetails/ReadRssDetails').default,
  // },
];
export const ReadRssCtx = React.createContext<any>({});

const ReadRss: FC = () => {
  // const navigation = useNavigation();
  // const [ReadRssCtxValue, setReadRssCtxValue] = useState({});
  const appSettings = useAppSettings();

  // useLayoutEffect(() => {
  //   setReadRssCtxValue({});
  // }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        {paddingTop: appSettings.insets?.top, backgroundColor: appSettings.colors.background},
      ]}>
      <StatusBar
        barStyle={appSettings.theme === 'light' ? 'dark-content' : 'light-content'}
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      {/*<ReadRssCtx.Provider value={ReadRssCtxValue}>*/}
      <Stack.Navigator>
        {stackRouter.map((routerItem, routerIdx) => (
          <Stack.Screen
            name={routerItem.name}
            component={routerItem.component}
            options={routerItem.options}
            key={routerIdx}
          />
        ))}
      </Stack.Navigator>
      {/*</ReadRssCtx.Provider>*/}
    </View>
  );
};

export default ReadRss;
