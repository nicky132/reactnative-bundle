import React, {FC, useLayoutEffect} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import {WebView} from 'react-native-webview';

const Home: FC = () => {
  const navigation = useNavigation();
  const appSettings = useAppSettings();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <View
      style={[
        styles.container,
        {
          // paddingTop: appSettings.insets?.top,
          backgroundColor: appSettings.colors.background,
        },
      ]}>
      <StatusBar
        barStyle={appSettings.theme === 'light' ? 'dark-content' : 'light-content'}
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      <WebView
        source={{uri: 'https://gaojuqian.gitee.io'}}
        androidLayerType={'hardware'}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          // Alert.alert(`WebView error: ${nativeEvent}`);
          console.warn(`WebView error: ${nativeEvent}`);
        }}
        // loading provide
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            style={{height: '100%', width: '100%'}}
            size="large"
            color={appSettings.colors.primary}
          />
        )}
        // 用于控制Web内容是否缩放以适应视图，并使用户能够更改缩放。默认值为true。
        scalesPageToFit={false}
        style={{backgroundColor: appSettings.colors.background}}
      />
    </View>
  );
};

export default Home;
