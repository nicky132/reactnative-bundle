import React from 'react';
import {Modal, Text, View} from 'react-native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import AppCardPressAble from '@components/commom/AppCardPressAble/AppCardPressAble';

interface IProps {
  children: React.ReactElement;
  visible: boolean;
  closeFun: () => void;
  okFun: () => void;
}
const AppModal = (props: IProps) => {
  const appSettings = useAppSettings();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          props.closeFun();
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: appSettings.colors.card}]}>
            <View>{props.children}</View>
            <View style={styles.ButtonBox}>
              <AppCardPressAble
                style={{...styles.openButton, backgroundColor: appSettings.colors.primary}}
                notAndroidRipple={true}
                onPress={() => {
                  props.okFun();
                }}>
                <Text style={styles.textStyle}>确认</Text>
              </AppCardPressAble>
              <AppCardPressAble
                style={{...styles.openButton, backgroundColor: appSettings.colors.card}}
                notAndroidRipple={true}
                onPress={() => {
                  props.closeFun();
                }}>
                <Text style={[styles.textStyle, {color: appSettings.colors.text}]}>取消</Text>
              </AppCardPressAble>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AppModal;
