import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {windowHeight, windowWidth} from '../util/Dimensions';
import {useSelector} from 'react-redux';
import {getData, removeData} from '../util/StorageFunction';
import RandomMasterCard from '../util/RandomMasterCard';

const Card = ({navigation}) => {
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [image, setImage] = useState(require('../assets/images/Atm5.jpg'));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getData('user');
        userData && setUser(userData);
        const asyncData = await getData('data');
        asyncData && setData(asyncData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setImage(RandomMasterCard());
    fetchData();
  }, []);
  const getMasterCard = () => {
    setImage(RandomMasterCard());
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => getMasterCard()}
        style={styles.cardBg}
        className="self-center justify-between rounded-xl overflow-hidden">
        <Image
          style={styles.image}
          className="w-full h-full absolute "
          source={image}
        />
        <View className="flex-row justify-between">
          <View className="flex pt-3 px-5 ">
            <Text className="text-gray-400 font-semibold text-md">
              Total Balance
            </Text>
            <Text className="text-white font-bold text-xl">
              ₹ {data?.amount ? parseFloat(data.amount).toFixed(2) : 0}
            </Text>
          </View>
          <View className="pt-3 px-5">
            <Text className="text-white font-bold text-2xl">· · ·</Text>
          </View>
        </View>

        {/* Credit */}
        <View className="flex-row justify-between">
          <View className="flex pb-3 px-5 ">
            <Text className="text-gray-400 font-semibold text-md">
              Card Holder
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Username', {
                  userName: user.username,
                })
              }>
              <Text className="text-white font-bold text-lg">
                {user.username}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            // onPress={() => {
            //   removeData('data');
            //   removeData('user');
            // }}
            className=" px-5">
            <Image
              style={styles.mastercard}
              source={require('../assets/images/MasterCard.png')}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View
        style={styles.cardShadow}
        className="self-center bg-slate-400 rounded-b-md"></View>
      <View
        style={styles.cardShadow2}
        className="self-center bg-slate-300 rounded-b-md"></View>
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardBg: {
    shadowRadius: 1,
    height: windowHeight / 4.5,
    width: windowWidth - 20,
  },
  image: {
    backgroundColor: '#000',
    opacity: 0.7,
  },
  mastercard: {
    width: windowWidth / 8.2,
    height: windowHeight / 20,
  },
  cardShadow: {
    width: windowWidth / 1.2,
    height: windowHeight / 180,
  },
  cardShadow2: {
    width: windowWidth / 1.5,
    height: windowHeight / 200,
  },
});
