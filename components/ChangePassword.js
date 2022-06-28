import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {style} from '../assets/style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './AuthContext';
import changePassword from '../images/change-password.png';

export default function ChangePassword() {
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [eyeSlash, setEyeSlash] = useState(false);
  const [eyeSlashOld, setEyeSlashOld] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secureOld, setSecureOld] = useState(true);
  const [error, setError] = useState({});
  const {signOut} = useContext(AuthContext);

  const visiblePassword = () => {
    setSecure(!secure);
    setEyeSlash(!eyeSlash);
  };

  const visibleOldPassword = () => {
    setSecureOld(!secureOld);
    setEyeSlashOld(!eyeSlashOld);
  };

  const changePasswordHandle = async () => {
    const userID = await AsyncStorage.getItem('userID');
    const access_token = await AsyncStorage.getItem('userToken');

    const userChangePassword = {
      password_lama: passwordLama,
      password: passwordBaru,
    };

    try {
      const result = await axios.put(
        // `http://192.168.1.12:8080/skripsi-backend/public/restapiuserpegawai/${userID}`,
        `https://absensibuana.my.id/restapiuserpegawai/${userID}`,
        userChangePassword,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      setPasswordLama('');
      setPasswordBaru('');
      await signOut(`${result.data.messages.success}`);
    } catch (err) {
      setError(err.response.data.messages);
      if (err.response.status === 401) {
        await signOut(`${err.response.data.message}`);
      }
    }
  };

  return (
    <SafeAreaView style={style.viewChangePassword}>
      <Image source={changePassword} />
      <Text style={style.ubahPassword}>Ubah Password</Text>
      <View style={style.changePassword}>
        <TextInput
          style={style.passwordOld}
          placeholder="Masukkan password lama..."
          autoCapitalize="none"
          secureTextEntry={secureOld}
          onChangeText={val => {
            setPasswordLama(val);
            setError({});
          }}
        />
        {secureOld ? (
          <TouchableOpacity
            style={style.iconPassword}
            onPress={visibleOldPassword}>
            <Icon name="eye" size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={style.iconPassword}
            onPress={visibleOldPassword}>
            <Icon name="eye-slash" size={20} />
          </TouchableOpacity>
        )}
      </View>
      {error.error && (
        <View style={style.viewError}>
          <Text style={style.error}>{error.error}</Text>
        </View>
      )}
      <View style={style.changePassword}>
        <TextInput
          style={style.passwordNew}
          placeholder="Masukkan password baru..."
          secureTextEntry={secure}
          autoCapitalize="none"
          onChangeText={val => {
            setPasswordBaru(val);
            setError({});
          }}
        />
        {secure ? (
          <TouchableOpacity
            style={style.iconPassword}
            onPress={visiblePassword}>
            <Icon name="eye" size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={style.iconPassword}
            onPress={visiblePassword}>
            <Icon name="eye-slash" size={20} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={style.buttonSignIn}
        onPress={changePasswordHandle}>
        <Text style={style.textSignIn}>Change</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
