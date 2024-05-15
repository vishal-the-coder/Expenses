import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {darkGrey} from '../util/Color';
import {getData} from '../util/StorageFunction';

const SplashScreenComponent = ({navigation}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getData('user');
        setTimeout(() => {
          SplashScreen.hide();
          user ? navigation.replace('Home') : navigation.replace('Username');
        }, 2000);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreenComponent;
