import React, {FC} from 'react';
import {Pressable, StatusBar, Text, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import Feather from 'react-native-vector-icons/Feather';

interface IControlComponent {
  controlListIdx: number;
  appSettings: AppSettings.ISettings;
  navigation: any;
}
const controlList = [
  {
    name: 'Rss',
    component: ({controlListIdx, appSettings, navigation}: IControlComponent) => {
      return (
        <Pressable
          style={({pressed}) => [
            styles.controlListItem,
            {
              backgroundColor: pressed
                ? appSettings.theme === 'light'
                  ? 'rgba(0,0,0, .1)'
                  : 'rgba(255,255,255, .6)'
                : appSettings.colors.card,
            },
          ]}
          onPress={() => {
            navigation.navigate('ReadRssSetting');
          }}
          key={controlListIdx}>
          <Text style={[styles.controlListItemText, {color: appSettings.colors.text}]}>
            Rss配置
          </Text>
          <Feather name={'chevron-right'} size={16} color={appSettings.colors.text} />
        </Pressable>
      );
    },
  },
];

const AppControl: FC = () => {
  const navigation = useNavigation();
  const appSettings = useAppSettings();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: appSettings.insets?.top,
          backgroundColor: appSettings.colors.background,
        },
      ]}>
      <StatusBar
        barStyle={appSettings.theme === 'light' ? 'dark-content' : 'light-content'}
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />

      <View style={[styles.controlList]}>
        {controlList.map((controlListItem, controlListIdx) =>
          controlListItem.component({controlListIdx, appSettings, navigation}),
        )}
      </View>
    </View>
  );
};

export default AppControl;
