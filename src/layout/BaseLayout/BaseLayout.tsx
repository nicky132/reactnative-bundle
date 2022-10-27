import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Pressable} from 'react-native';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const router = [
  {
    name: 'Home',
    options: {
      title: '首页',
    },
    component: require('src/page/Home/Home').default,
  },
  {
    name: 'ReadRss',
    options: {
      title: 'RSS',
      headerShown: false,
    },
    component: require('src/page/ReadRss/ReadRss').default,
  },
  {
    name: 'AppControl',
    options: {
      title: '控制台',
      headerShown: false,
    },
    component: require('src/page/AppControl/AppControl').default,
  },
];

const BaseTab = () => {
  const appSettings = useAppSettings();
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        // tabBar={() => null}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const iconName = 'compass';
            // TODO 优化
            if (route.name === 'Home') {
              return (
                <Fontisto
                  name={focused ? 'laughing' : 'slightly-smile'}
                  size={size}
                  color={color}
                />
              );
            }
            if (route.name === 'AppControl') {
              return (
                <Ionicons
                  name={focused ? 'ios-cube' : 'ios-cube-outline'}
                  size={size}
                  color={color}
                />
              );
            }
            if (route.name === 'ReadRss') {
              return (
                <MaterialCommunityIcons
                  name={focused ? 'rss-box' : 'rss'}
                  size={size}
                  color={color}
                />
              );
            }
            return <Fontisto name={iconName} size={size} color={color} />;
          },
          tabBarButton: props => {
            return (
              <Pressable
                {...props}
                style={({pressed}) => ({
                  transform: pressed ? [{scale: 0.9}] : [{scale: 1}],
                  backgroundColor: appSettings.colors.background,
                  flex: 1,
                })}
              />
            );
          },
          tabBarActiveTintColor: appSettings.colors.primary,
          tabBarInactiveTintColor: appSettings.colors.text,
          tabBarStyle: {backgroundColor: appSettings.colors.background},
        })}>
        {router.map((routerItem, routerIdx) => (
          <Tab.Screen
            name={routerItem.name}
            component={routerItem.component}
            options={routerItem.options}
            key={routerIdx}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

// 单页跳转
const BaseLayoutRouter = [
  {name: 'AppBase', options: {headerShown: false}, component: BaseTab},
  {
    name: 'TabListDetails',
    options: {headerShown: false},
    component: require('src/components/ReadRssComponents/ReadRssDetails/ReadRssDetails').default,
  },
  {
    name: 'ReadRssSetting',
    options: {headerShown: false},
    component: require('src/components/ReadRssComponents/ReadRssSetting/ReadRssSetting').default,
  },
];
// export const BaseLayoutCtx = React.createContext<any>({});
const BaseLayout = () => {
  // const navigation = useNavigation();
  // const [BaseLayoutCtxValue, setBaseLayoutCtxValue] = useState({navigation: navigation});
  // useLayoutEffect(() => {
  //   setBaseLayoutCtxValue({navigation: navigation});
  // }, [navigation]);

  return (
    // <BaseLayoutCtx.Provider value={BaseLayoutCtxValue}>
    <Stack.Navigator>
      {BaseLayoutRouter.map((routerItem, routerIdx) => (
        <Stack.Screen
          name={routerItem.name}
          component={routerItem.component}
          options={routerItem.options}
          key={routerIdx}
        />
      ))}
    </Stack.Navigator>
    // </BaseLayoutCtx.Provider>
  );
};

export default BaseLayout;
