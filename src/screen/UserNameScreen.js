import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {saveData} from '../util/StorageFunction';
import {BlueMainColor, darkGrey, GreyColor} from '../util/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserNameScreen = ({navigation, route}) => {

  const {userName} = route?.params ? route.params : '';

  const [username, setUsername] = useState('');

  const handleUsernameChange = text => {
    setUsername(text);
  };

  const handleContinue = async () => {
    await saveData('user', {username: username});
    navigation.replace('Home');
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };
  useEffect(() => {
    if (userName) {
      setUsername(userName);
    }
  }, []);

  return (
    <>
      {userName && (
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeIcon}>
            <Ionicons name="close" size={24} color={darkGrey} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.title}>
          {userName ? 'Edit Username' : 'Choose a Username'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          onChangeText={handleUsernameChange}
          placeholderTextColor={GreyColor}
          value={username}
          autoFocus={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>
            {userName ? 'Update' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: darkGrey,
  },
  closeIcon: {
    position: 'absolute',
    top: 25,
    left: 25,
    zIndex: 1,
  },
  input: {
    color: '#000',
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: BlueMainColor,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: BlueMainColor,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default UserNameScreen;
