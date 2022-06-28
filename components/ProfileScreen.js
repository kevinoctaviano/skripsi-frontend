/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {style} from '../assets/style';
import {profile} from '../assets/profile';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import user from '../images/user.png';

export default function ProfileScreen({navigation}) {
  const {signOut} = useContext(AuthContext);
  const [dataUser, setDataUser] = useState();
  const [loading, setLoading] = useState(true);

  const getUserLogin = async () => {
    try {
      const access_token = await AsyncStorage.getItem('userToken');
      const userID = await AsyncStorage.getItem('userID');

      axios
        .get(`https://absensibuana.my.id/restapiuserpegawai/${userID}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(res => {
          setLoading(false);
          setDataUser(res.data.pegawai[0]);
        })
        .catch(err => {
          setLoading(true);
          ToastAndroid.show(
            `${err.response.data.messages.error}`,
            ToastAndroid.SHORT,
          );
        });
    } catch (error) {
      if (error.response.status === 401) {
        await signOut(`${error.response.data.message}`);
      }
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  const logoutHandle = async () => {
    await signOut('Berhasil logout!');
  };

  const changePasswordHandle = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <View style={style.container}>
      {dataUser ? (
        <>
          <View style={profile.header} />
          <View style={profile.pictureCenter}>
            <Image source={user} style={profile.picture} />
            <Text style={profile.username}>
              {dataUser.firstname + ' ' + dataUser.lastname}
            </Text>
          </View>
          <ScrollView>
            <View style={style.center}>
              <View style={profile.card}>
                <Icon name="id-card" size={20} />
                <Text style={profile.textProfile}>{dataUser.nip}</Text>
              </View>
              <View style={profile.card}>
                <Icon name="user-tie" size={20} />
                <Text style={profile.textProfile}>{dataUser.divisi_name}</Text>
              </View>
              <View style={profile.card}>
                <Icon name="envelope" size={20} />
                <Text style={profile.textProfile}>{dataUser.email}</Text>
              </View>
              <View style={profile.card}>
                <Icon name="map-marker-alt" size={20} />
                <Text style={profile.textProfile}>{dataUser.address}</Text>
              </View>
              <TouchableOpacity
                style={profile.buttonChangePassword}
                onPress={changePasswordHandle}>
                <Icon name="key" size={20} color={'#f9ca24'} />
                <Text style={profile.textLogout}>CHANGE PASSWORD</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={profile.buttonLogout}
                onPress={logoutHandle}>
                <Icon name="sign-out-alt" size={20} color={'#fff'} />
                <Text style={profile.textLogout}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      ) : (
        loading && (
          <View style={style.center}>
            <ActivityIndicator
              size={'large'}
              color={'#686de0'}
              animating={loading}
            />
          </View>
        )
      )}
    </View>
  );
}
