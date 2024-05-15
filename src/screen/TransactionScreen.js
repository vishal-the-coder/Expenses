import {useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {windowHeight, windowWidth} from '../util/Dimensions';
import {DAYS, MONTHS} from '../util/ExtraData';
import Transction from '../components/Transction';
import {useDispatch} from 'react-redux';
import {DataAction} from '../store/DataSlice';
import {getData, saveData} from '../util/StorageFunction';
import RandomColor from '../util/RandomColor';
import {lightGrey} from '../util/Color';

const TransactionScreen = ({navigation, route}) => {
  const {id, title, description, amount, image, credit, date, all} =
    route.params;
  const dispatch = useDispatch();
  const updateData = () => {
    try {
      navigation.navigate('ExpenseForm', {
        iid: id,
        ttitle: title,
        ddescription: description,
        iimage: image,
        aamount: amount,
        ccredit: credit,
        ddate: date,
        edit: true,
        all: all,
      });
    } catch (error) {
      throw error;
    }
  };
  const deleteData = async () => {
    try {
      dispatch(DataAction.Remove(id, amount));
      let data = await getData('data');
      data.data = data.data.filter(item => item.id !== id);
      data.amount = credit ? data.amount - amount : data.amount + amount;
      await saveData('data', data);
      await navigation.goBack();
      await navigation.reset({
        index: 1,
        routes: [{name: all ? 'SeeAll' : 'Home'}],
      });
    } catch (error) {
      console.log(' Error while delete data');
    }
  };
  return (
    <>
      <SafeAreaView
        style={{backgroundColor: '#1a3a8a', height: windowHeight / 14}}>
        <View className="flex-row my-4">
          <TouchableOpacity
            style={{width: windowWidth / 8}}
            className="my-auto"
            onPress={() => navigation.goBack()}>
            <Text className="text-white text-center">
              <Entypo name="chevron-left" size={24} />
            </Text>
          </TouchableOpacity>

          <Text className="text-xl my-auto text-white font-semibold">
            Transaction Detail
          </Text>
        </View>
      </SafeAreaView>

      <View
        style={{backgroundColor: lightGrey}}
        className="mx-auto mt-10">
        <View
          style={{width: (windowWidth * 7) / 8}}
          className="flex justify-center items-center">
          <View
            style={{borderTopWidth: 10, borderTopColor: RandomColor()}}
            className="bg-white rounded-md shadow-xl shadow-black px-6 py-6">
            <Text className="text-2xl text-gray-900 font-bold mb-2">
              {title}
            </Text>
            <Text className="text-gray-500">
              {DAYS[new Date(date).getDay()].substring(0, 3)}{' '}
              {MONTHS[new Date(date).getMonth()]} {new Date(date).getDate()}
              {', '}
              {new Date(date).getFullYear()}
            </Text>
            <Text className="text-xl text-gray-900 font-bold mt-4">
              ₹{amount}
            </Text>
            <Text
              className={`text-base mt-2 ${
                credit ? 'text-green-700' : 'text-red-700 '
              }`}>
              {credit ? 'Credit' : 'Debit'}
            </Text>

            <Text className="text-gray-800 mt-4">Description:</Text>
            <Text className="text-gray-800">{description}</Text>

            <Text className="text-gray-800 mt-4">Transaction ID:</Text>
            <Text className="text-gray-900 font-bold">{id}</Text>
            <View className="px-20 flex flex-row justify-around">
              <TouchableOpacity
                onPress={() => updateData()}
                className="mt-8 rounded-full border-2 border-green-700  px-1.5 py-1.5">
                <Text className="text-green-700">
                  <MaterialIcons name="edit" size={20} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteData()}
                className="mt-8 rounded-full border-2 border-red-700  px-1.5 py-1.5">
                <Text className="text-red-700">
                  <MaterialIcons name="delete" size={20} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
export default TransactionScreen;

const styles = StyleSheet.create({
  mainTopBar: {
    height: windowHeight / 20,
  },
});
