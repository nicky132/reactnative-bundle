import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IProps {
  children?: React.ReactNode;
  title?: string;
  renderRight?: React.ReactNode;
  onRightPress?: () => void;
}
const AppHeader = (props: IProps) => {
  const appSettings = useAppSettings();
  // const route = useRoute();
  const navigation = useNavigation();

  const [iconSize, setIconSize] = useState(30);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: appSettings.colors.background,
          paddingTop: appSettings.insets?.top,
        },
      ]}>
      <View style={styles.left}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={({pressed}) => ({
            opacity: pressed ? 0.8 : 1,
            transform: pressed ? [{scale: 0.9}] : [{scale: 1}],
          })}>
          <Feather name={'chevron-left'} size={iconSize} color={appSettings.colors.text} />
        </Pressable>
      </View>
      {props.title && (
        <Text style={[{color: appSettings.colors.text}, styles.title]} numberOfLines={1}>
          {props.title}
        </Text>
      )}
      <View style={{opacity: props.renderRight ? 1 : 0, ...styles.right}}>
        <Pressable
          onPress={() => {
            props?.onRightPress?.();
          }}
          style={({pressed}) => ({
            opacity: pressed ? 0.8 : 1,
            transform: pressed ? [{scale: 0.9}] : [{scale: 1}],
          })}>
          {props?.renderRight ? (
            props.renderRight
          ) : (
            <AntDesign name={'setting'} size={iconSize} color={appSettings.colors.text} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default AppHeader;
