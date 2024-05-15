import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowWidth} from '../util/Dimensions';
import RandomColor from '../util/RandomColor';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData} from '../util/StorageFunction';

const Transction = ({navigation, date, all}) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const asyncData = await getData('data');
        setData(asyncData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const newData =
    all && data?.data?.sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log('this is data::::', data);
  return (
    <>
      {data &&
        (all ? newData : data?.data)?.map(item => {
          const itemDate = new Date(item.date);
          const currentDate = date;
          const randomColor = RandomColor();
          if (
            all
              ? itemDate.getMonth() === currentDate.getMonth() &&
                itemDate.getFullYear() === currentDate.getFullYear()
              : itemDate.getDate() === currentDate.getDate() &&
                itemDate.getMonth() === currentDate.getMonth() &&
                itemDate.getFullYear() === currentDate.getFullYear()
          ) {
            return (
              <TouchableOpacity
                style={{width: (windowWidth * 9.6) / 10}}
                key={item.id}
                onPress={() =>
                  navigation.navigate('Transaction', {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    amount: item.amount,
                    image: item.image,
                    credit: item.credit,
                    date: item.date,
                    all: all,
                  })
                }>
                <View className="bg-white flex-row rounded-lg overflow-hidden m-1">
                  <View
                    style={{backgroundColor: randomColor}}
                    className="p-2"></View>
                  <View
                    key={item.id}
                    style={styles.mainView}
                    className="px-4 py-2 shadow-md flex-row items-center">
                    <Image
                      style={styles.image}
                      source={item.image}
                      className="rounded-full mr-4"
                    />
                    <View
                      style={styles.dataView}
                      className="flex-row items-center justify-between">
                      <View>
                        <Text className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </Text>
                        <Text className="text-sm text-gray-600">
                          {item.description}
                        </Text>
                        {all && (
                          <Text className="text-sm text-gray-600">
                            {new Date(item.date).toLocaleDateString()}
                          </Text>
                        )}
                      </View>
                      <View>
                        <Text className="text-gray-900 font-bold">₹ {item.amount}</Text>
                        <Text className="text-right text-gray-500">
                          {item.credit ? 'Credit' : 'Debit'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }
        })}
    </>
  );
};

export default Transction;

const styles = StyleSheet.create({
  mainView: {
    width: windowWidth - 23,
  },
  image: {
    width: windowWidth / 9,
    height: windowWidth / 9,
  },
  dataView: {
    width: windowWidth / 1.5,
  },
});
