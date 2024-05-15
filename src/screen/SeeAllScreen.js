import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {windowHeight, windowWidth} from '../util/Dimensions';
import {MONTHS} from '../util/ExtraData';
import Transction from '../components/Transction';
import { lightGrey } from '../util/Color';

const SeeAllScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <>
      <SafeAreaView
        style={{backgroundColor: '#1a3a8a', height: windowHeight / 14}}
        className="flex-row my-auto">
        <TouchableOpacity
          style={{width: windowWidth / 8}}
          className="my-auto"
          onPress={() => navigation.replace('Home')}
          // onPress={() => navigation.goBack()}
        >
          <Text className="text-center text-white">
            <Entypo name="chevron-left" size={28} />
          </Text>
        </TouchableOpacity>
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
          className="flex-row my-auto items-center">
          <View style={{width: (3 * windowWidth) / 4}}>
            <Text className="font-bold align-center text-lg text-white">
              {MONTHS[date.getMonth()]}, {date.getFullYear()}
            </Text>
          </View>

          <TouchableOpacity
            style={{width: windowWidth / 8}}
            activeOpacity={0.6}
            onPress={() => setOpen(true)}>
            <Text className="text-white">
              <Entypo name="calendar" size={28} />
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView style={{backgroundColor: lightGrey}} className="mx-2 my-4">
        <Transction navigation={navigation} date={date} all={true} />
      </ScrollView>
    </>
  );
};
export default SeeAllScreen;

const styles = StyleSheet.create({
  mainTopBar: {
    height: windowHeight / 20,
  },
});
