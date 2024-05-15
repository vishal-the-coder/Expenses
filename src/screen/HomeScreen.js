import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {windowHeight} from '../util/Dimensions';
import DatePicker from 'react-native-date-picker';
import Card from '../components/Card';
import Transction from '../components/Transction';
import {DAYS, MONTHS} from '../util/ExtraData';
import {darkGrey, lightGrey} from '../util/Color';

const HomeScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <SafeAreaView
        style={{height: windowHeight / 15, backgroundColor: lightGrey}}>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          maximumDate={new Date()}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View
          style={styles.mainTopBar}
          onPress={() => setOpen(true)}
          className="flex-row my-auto items-center justify-between mx-3">
          <TouchableOpacity activeOpacity={0.6} onPress={() => setOpen(true)}>
            <View>
              <Text className="text-blue-900">{DAYS[date.getDay()]} ,</Text>
              <Text className="font-bold text-lg text-blue-900">
                {date.getDate() < 10 ? '0' + date.getDate() : date.getDate()},{' '}
                {MONTHS[date.getMonth()]}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SeeAll')}>
            <Text className="text-blue-900">See All</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View>
        {/* Main Card */}
        <View style={{height: windowHeight / 4.5}} className="my-1">
          <Card navigation={navigation} />
        </View>

        {/* Today Expenses */}
        <View className="mx-3 my-3">
          <Text className="font-bold text-xl text-blue-900">
            Today's Expenses
          </Text>
        </View>

        {/* Transaction list  */}

        <ScrollView style={{height: windowHeight / 2.2}} className="mx-2 mb-32">
          <Transction navigation={navigation} date={date} />
        </ScrollView>

        {/* List of expenses can be displayed here */}
      </View>
      <View className="absolute bottom-0 w-full bg-blue-900 pt-5 pb-16 rounded-t-2xl">
        <TouchableOpacity
          className="py-1 bg-white mx-5 rounded-md"
          onPress={() => navigation.navigate('ExpenseForm', {edit: false})}>
          <Text
            style={{color: darkGrey}}
            className="text-blue-900 text-center py-1.5 font-bold text-xl">
            Add Expense
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainTopBar: {
    height: windowHeight / 20,
  },
});
