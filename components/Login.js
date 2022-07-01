import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {style} from '../assets/style';
import bgLogin from '../images/bg-login.jpg';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import logo from '../images/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eyeSlash, setEyeSlash] = useState(false);
  const [secure, setSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const {signIn} = React.useContext(AuthContext);

  const visiblePassword = () => {
    setSecure(!secure);
    setEyeSlash(!eyeSlash);
  };

  const loginHandle = () => {
    setIsLoading(true);
    const userLogin = {
      email: email,
      password: password,
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    axios
      .post('https://absensibuana.my.id/authentikasi', userLogin, {
        headers: headers,
      })
      .then(response => {
        setIsLoading(false);
        if (response.data.status === 400) {
          return setError(response.messages);
        }
        if (response.data.access_token) {
          signIn(
            response.data.access_token,
            response.data.data[0].id,
            response.data.data[0].isUpdate,
          );
        }
      })
      .catch(err => {
        setIsLoading(false);
        if (err.response.status === 400) {
          setError(err.response.data.messages);
        }
      });
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={bgLogin}
      style={style.backgroundImage}>
      <SafeAreaView style={style.center}>
        <Image source={logo} style={style.loginScreenIcon} />
        <Text style={style.title}>Selamat datang!</Text>
        <Text style={style.subTitle}>Silakan login untuk absensi anda</Text>
        {error.error && (
          <View style={style.viewError}>
            <Text style={style.error}>{error.error}</Text>
          </View>
        )}
        <TextInput
          style={style.input}
          placeholder="Masukkan email..."
          placeholderTextColor="#FFF"
          autoCapitalize="none"
          onChangeText={val => {
            setEmail(val);
            setError({});
          }}
        />
        {error.email && (
          <View style={style.viewError}>
            <Text style={style.error}>{error.email}</Text>
          </View>
        )}
        <View style={style.password}>
          <TextInput
            style={style.textPassword}
            placeholder="Masukkan password..."
            secureTextEntry={secure}
            placeholderTextColor="#FFF"
            autoCapitalize="none"
            onChangeText={val => {
              setPassword(val);
              setError({});
            }}
          />
          {secure ? (
            <TouchableOpacity
              style={style.iconPassword}
              onPress={visiblePassword}>
              <Icon name="eye" size={20} color={'#fff'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={style.iconPassword}
              onPress={visiblePassword}>
              <Icon name="eye-slash" size={20} color={'#fff'} />
            </TouchableOpacity>
          )}
        </View>
        {error.password && (
          <View style={style.viewError}>
            <Text style={style.error}>{error.password}</Text>
          </View>
        )}
        <TouchableOpacity style={style.buttonSignIn} onPress={loginHandle}>
          {isLoading === true ? (
            <ActivityIndicator size="small" color="#30336b" />
          ) : (
            <Text style={style.textSignIn}>LOGIN</Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;
