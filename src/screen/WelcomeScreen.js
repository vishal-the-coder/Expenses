import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {windowWidth} from '../util/Dimensions';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

const WelcomeScreen = ({navigation}) => {
  return (
    <View className="flex-1 justify-around items-center">
      <View>
        <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-4xl text-blue-600 text-center font-bold">Welcome Back, Vishal</Animated.Text>
        <Animated.Text entering={FadeInUp.delay(200).duration(1000).springify()} className="text-lg text-center mt-4">
          Thank you for returning to our app!
        </Animated.Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Animated.View
        entering={FadeInUp.delay(400).duration(1000).springify()}
          style={styles.getStarted}
          className="bg-blue-600 items-center py-5 rounded-xl">
          <Text className="text-white font-bold text-xl">Get Started</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  getStarted: {
    width: windowWidth - 20,
  },
});
