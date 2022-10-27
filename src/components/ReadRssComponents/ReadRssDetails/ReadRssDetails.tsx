import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import {WebView} from 'react-native-webview';
import RssModels from 'src/request/models/rssModels';
import AppHeader from '@components/commom/AppHeader/AppHeader';

const rssModels = new RssModels();

interface IProps {
  children?: React.ReactNode;
  route: {
    params: {
      url: string;
      title: string;
    };
  };
}
const ReadRssList = (props: IProps) => {
  const appSettings = useAppSettings();
  const [source, setSource] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const link = props.route.params.url;
      setSource(link);
      // const resp = await rssModels.fetchGet(link);
      // console.log(resp);
      // if (resp) {
      //   setSource({
      //     html: resp,
      //   });
      // }
    })();
  }, [props.route.params.url]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: appSettings.colors.background,
        },
      ]}>
      <AppHeader title={props.route.params.title} />
      <WebView
        source={{uri: source}}
        androidLayerType={'hardware'}
        onLoadStart={syntheticEvent => {
          // const {nativeEvent} = syntheticEvent;
        }}
        onLoad={syntheticEvent => {
          // const {nativeEvent} = syntheticEvent;
        }}
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
      {/*{source && <RenderHtml contentWidth={width} source={source} />}*/}
    </View>
  );
};

export default ReadRssList;
