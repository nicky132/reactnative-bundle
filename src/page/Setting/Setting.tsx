import React, {FC, useLayoutEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';

const Setting: FC = props => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // 安全区 paddingTop: insets.top
  const appSettings = useAppSettings();
  console.log('appSettings', appSettings);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  console.log(props);
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <StatusBar
        barStyle={appSettings.theme === 'light' ? 'dark-content' : 'light-content'}
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      <Text>Setting Screen</Text>
      <Text>Setting Screen</Text>
      <Text>Setting Screen</Text>
      <Text>Setting Screen</Text>
      <Text>Setting Screen</Text>
      <Text>Setting Screen</Text>
      <Text>Setting Screen</Text>
      <Text>Setting Screen</Text>
      <Text>Setting Screen</Text>
      <Text>Setting Screen</Text>
      <Text>Setting Screen</Text>
      <Text>Setting Screen</Text>
    </View>
  );
};

export default Setting;
