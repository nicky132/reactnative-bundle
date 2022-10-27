import React from 'react';
import {GestureResponderEvent, Pressable, StyleProp, ViewStyle} from 'react-native';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';

interface IProps {
  children: React.ReactElement;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  notAndroidRipple?: boolean;
}
const AppCardPressAble = (props: IProps) => {
  const appSettings = useAppSettings();

  return (
    <Pressable
      onPress={event => props.onPress(event)}
      android_ripple={{
        color: props.notAndroidRipple ? 'rgba(0,0,0,0)' : appSettings.colors.primary,
      }}
      style={({pressed}) => ({
        backgroundColor: pressed
          ? appSettings.theme === 'light'
            ? 'rgba(0,0,0, .1)'
            : 'rgba(255,255,255, .6)'
          : appSettings.colors.card,
        transform: pressed ? [{scale: 0.98}] : [{scale: 1}],
        ...(props.style as object),
      })}>
      {props.children}
    </Pressable>
  );
};

export default AppCardPressAble;
