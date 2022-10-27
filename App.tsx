// 必须在顶部 https://reactnavigation.org/docs/drawer-navigator/#installation
import 'react-native-gesture-handler';
import React from 'react';
// 导航器 https://reactnavigation.org/docs/getting-started
import {NavigationContainer} from '@react-navigation/native';
import SettingsProvider from '@components/SettingsProvider/SettingsProvider';
import BaseLayout from './src/layout/BaseLayout/BaseLayout';
import {SafeAreaProvider} from 'react-native-safe-area-view';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SettingsProvider>
          <BaseLayout />
        </SettingsProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
