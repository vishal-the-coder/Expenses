import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <>
      {/* <AuthStack /> */}
      <SafeAreaProvider>
        <Provider store={store}>
          <AppStack />
        </Provider>
      </SafeAreaProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
