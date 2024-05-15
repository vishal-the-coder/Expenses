import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-white w-full h-full">
      <StatusBar barStyle="light-content" />
      <Image
        className="w-full h-full absolute"
        source={require('../assets/images/background.png')}
      />

      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="w-[103] h-[255]"
          source={require('../assets/images/light.png')}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          className="w-[65] h-[160]"
          source={require('../assets/images/light.png')}
        />
      </View>

      {/* title and form */}
      <View className="w-full h-full flex justify-around pt-40 ">
        {/* title */}
        <View className="flex items-center pt-10">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl">
            Sign Up
          </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-4 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 rounded-2xl w-full">
            <TextInput
              className="p-5"
              placeholder="Username"
              placeholderTextColor={'gray'}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 rounded-2xl w-full">
            <TextInput
              className="p-5"
              placeholder="Email"
              placeholderTextColor={'gray'}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="bg-black/5 rounded-2xl w-full mb-3">
            <TextInput
              className="p-5"
              placeholder="Password"
              placeholderTextColor={'gray'}
              secureTextEntry
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="w-full">
            <TouchableOpacity className="w-full bg-sky-600 p-3 rounded-2xl mb-3">
              <Text className="text-xl font-bold text-white text-center">
                Sign Up
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            className="flex-row text-center">
            <Text>Already you have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-sky-600">Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
