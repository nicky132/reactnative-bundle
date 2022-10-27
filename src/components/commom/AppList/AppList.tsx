import React, {useLayoutEffect, useState} from 'react';
import {FlatList, Image, ListRenderItem, Text, View} from 'react-native';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';

const noListImg = require('src/assets/commom/noList.png');

/**
 *  - appListData 渲染的数组
 *  - renderItem 渲染item
 *  - keyExtractor item -> key
 *  - extraData  指定除data外引用在item的属性->渲染用
 *  - refreshingFunction 下拉刷新方法
 *  - endReachedFunction 上拉加载
 */
interface IAppListProps {
  children?: React.ReactNode;
  appListData: any[];
  renderItem: ListRenderItem<any>;
  keyExtractor: (item: any, index: number) => string;
  extraData?: any;
  refreshingFunction?: () => Promise<any>;
  endReachedFunction?: () => Promise<any>;
}
const AppList = (props: IAppListProps) => {
  const appSettings = useAppSettings();
  // 在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的符号。
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [appListData, setAppListData] = useState<any[]>([]);

  useLayoutEffect(() => {
    setAppListData(props.appListData);
  }, [props.appListData]);

  return (
    <>
      <FlatList
        onRefresh={async () => {
          setIsRefreshing(true);
          if (typeof props.refreshingFunction !== 'undefined') {
            await props.refreshingFunction();
          }
          setIsRefreshing(false);
        }}
        onEndReached={async () => {
          if (typeof props.endReachedFunction !== 'undefined') {
            await props.endReachedFunction();
          }
        }}
        // 0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。
        onEndReachedThreshold={0.2}
        refreshing={isRefreshing}
        data={appListData}
        renderItem={props.renderItem}
        keyExtractor={props.keyExtractor}
        extraData={props.extraData}
        // 尾部组件
        // ListFooterComponent={() => (
        //   <ActivityIndicator style={{flex: 1}} size="large" color={appSettings.colors.primary} />
        // )}
        // 列表为空时渲染该组件。
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '50%',
            }}>
            <Image source={noListImg} />
            <Text style={{color: appSettings.colors.text, marginTop: 10}}>暂无数据</Text>
          </View>
        )}
      />
    </>
  );
};

export default AppList;
