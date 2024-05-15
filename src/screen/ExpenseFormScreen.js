import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';
import Entypo from 'react-native-vector-icons/Entypo';
import {windowHeight, windowWidth} from '../util/Dimensions';
import RandomIcon from '../util/RandomIcon';
import {getData, saveData} from '../util/StorageFunction';
import {mainColor} from '../util/RandomColor';
import {darkGrey, GreyColor, lightGrey} from '../util/Color';

const StylishForm = ({navigation, route}) => {
  const {
    iid,
    ttitle,
    ddescription,
    iimage,
    aamount,
    ccredit,
    ddate,
    edit,
    all,
  } = route?.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [regexValid, setRegexValid] = useState(true);
  const [amountValid, setAmountValid] = useState(false);

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const asyncData = await getData('data');
        setData(asyncData?.data);
        setCount(asyncData?.amount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    if (edit) {
      setTitle(ttitle);
      setDescription(ddescription);
      setAmount(aamount.toString());
      setDate(new Date(ddate));
      setIsChecked(ccredit);
    }
  }, []);

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    setTitle(trimmedTitle);
    setDescription(trimmedDescription);

    if (!amount || !trimmedTitle) {
      setValidationMessage(true);
      return false;
    } else if (trimmedTitle.length > 0) {
      const regex = /^[a-zA-Z]+$/;
      const result = regex.test(trimmedTitle);
      setRegexValid(result);
      if (!result) {
        return false;
      }
    }
    const expense = {
      id: edit ? iid : uuid.v4(),
      title: trimmedTitle,
      description: trimmedDescription,
      image: edit ? iimage : RandomIcon(),
      amount: parseFloat(amount).toFixed(2),
      credit: isChecked,
      date: date.toString(),
    };
    const newData = {
      data: data ? [...data, expense] : [expense],
      amount: data
        ? isChecked
          ? parseFloat(count) + parseFloat(expense.amount)
          : parseFloat(count) - parseFloat(expense.amount)
        : isChecked
        ? expense.amount
        : 0 - expense.amount,
    };
    const updatedData = updatedData => {
      const newData = data?.map(item => {
        if (item.id === updatedData.id) {
          return {
            ...item,
            ...updatedData,
          };
        }
        return item;
      });
      const amount = isChecked
        ? ccredit
          ? parseFloat(count) -
            parseFloat(aamount) +
            parseFloat(updatedData.amount)
          : parseFloat(count) +
            parseFloat(aamount) +
            parseFloat(updatedData.amount)
        : ccredit
        ? parseFloat(count) -
          parseFloat(aamount) -
          parseFloat(updatedData.amount)
        : parseFloat(count) +
          parseFloat(aamount) -
          parseFloat(updatedData.amount);

      return {
        data: newData,
        amount: parseFloat(amount).toFixed(2),
      };
    };
    await saveData('data', edit ? updatedData(expense) : newData);
    // navigation.replace('Home');
    navigation.goBack();
    navigation.reset({
      index: 0,
      routes: [{name: all ? 'SeeAll' : 'Home'}],
    });
  };

  return (
    <>
      {/* header */}
      <SafeAreaView
        style={{backgroundColor: mainColor, height: windowHeight / 14}}>
        <View className="flex-row my-auto">
          <TouchableOpacity
            style={{width: windowWidth / 8}}
            className="my-auto"
            onPress={() => navigation.goBack()}>
            <Text className="text-white text-center">
              <Entypo name="chevron-left" size={28} />
            </Text>
          </TouchableOpacity>

          <Text className="text-xl my-auto text-white font-semibold">
            Expense Form
          </Text>
        </View>
      </SafeAreaView>

      {/* detail form */}
      <View style={{backgroundColor: lightGrey}} className="mx-2 mt-7 px-2">
        {/* title */}
        <View style={styles.bottomBorder} className="mb-4 border-b">
          <Text style={styles.textHeader} className="mb-1 font-bold">
            Title <Text className="text-red-600"> *</Text>
          </Text>
          <TextInput
            placeholderTextColor={GreyColor}
            className="text-black input ml-2 py-1"
            placeholder="Enter title"
            value={title}
            onChangeText={text => {
              setTitle(text);
              setValidationMessage(false);
              setRegexValid(true);
            }}
          />
        </View>

        {/* description */}
        <View style={styles.bottomBorder} className="mb-4 border-b">
          <Text style={styles.textHeader} className="mb-1 font-bold">
            Description
          </Text>
          <TextInput
            placeholderTextColor={GreyColor}
            className="text-black input ml-2 py-1"
            placeholder="Enter description"
            value={description}
            onChangeText={text => {
              setDescription(text);
            }}
          />
        </View>

        {/* amount */}
        <View style={styles.bottomBorder} className="mb-4 border-b">
          <Text style={styles.textHeader} className="mb-1 font-bold">
            Amount<Text className="text-red-600"> *</Text>
          </Text>
          <TextInput
            placeholderTextColor={GreyColor}
            className="text-black input ml-2 py-1 "
            placeholder="Enter amount"
            value={amount}
            onChangeText={text => {
              if (text.includes('-')) {
                setAmount(text.trim().split('-')[1]);
              } else {
                setAmount(text.trim());
              }
            }}
            keyboardType="numeric"
          />
        </View>

        {/* date */}
        <View style={styles.bottomBorder} className="mb-4 border-b">
          <Text style={styles.textHeader} className="mb-1 font-bold">
            Date
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            className="py-2"
            onPress={() => setDatePickerOpen(!datePickerOpen)}>
            <Text className="text-black ml-2 ">
              {date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          <DatePicker
            mode="date"
            modal
            open={datePickerOpen}
            maximumDate={new Date()}
            date={date}
            onConfirm={date => {
              setDatePickerOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setDatePickerOpen(false);
            }}
          />
        </View>

        {/* Checkbox  */}
        <View className="flex-row">
          <Checkbox
            onPress={() => {
              setIsChecked(!isChecked);
            }}
            status={isChecked ? 'checked' : 'unchecked'}
            color="#1a3a8a"
            uncheckedColor="#1a3a8a"
          />
          <Text className="pl-2 font-bold my-auto text-blue-900">Credit</Text>
        </View>

        {/* validation */}
        <View>
          {validationMessage && (
            <Text className="text-red-600 pt-4">
              * Amount and Title are mandatory!
            </Text>
          )}
          {amountValid && (
            <Text className="text-red-600 pt-4">
              * Amount must be greater than 0 and less than 100Cr!
            </Text>
          )}
          {regexValid === false && (
            <Text className="text-red-600 pt-4">
              * Title cannot contain special characters or numbers.
            </Text>
          )}
        </View>

        {/* button */}
        <TouchableOpacity
          className="bg-blue-900 p-2 rounded mt-4"
          onPress={handleSubmit}>
          <Text className="text-white font-bold text-md text-center ">
            {edit ? 'Update' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default StylishForm;

const styles = StyleSheet.create({
  textHeader: {color: darkGrey},
  bottomBorder: {borderBottomColor: darkGrey},
});
