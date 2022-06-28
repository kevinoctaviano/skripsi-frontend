/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Image,
} from 'react-native';
import {style} from '../assets/style';
import {lists} from '../assets/lists';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import AbsenCell from './AbsenCell';
import empty from '../images/empty.png';

export default function Home({navigation}) {
  const [dataAbsen, setDataAbsen] = useState([]);
  const [dataAbsenKosong, setDataAbsenKosong] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const {signOut} = useContext(AuthContext);

  const isUpdatePassword = async () => {
    const isUserUpdate = await AsyncStorage.getItem('isUpdate');
    if (isUserUpdate === '0') {
      Alert.alert(
        'Peringatan!',
        'Silakan ganti password anda terlebih dahulu demi keamanan akun.',
        [
          {
            cancleble: true,
            text: 'Cancel',
          },
          {
            text: 'Ya, ganti',
            onPress: () => {
              // console.log('OK!');
              navigation.navigate('ChangePassword');
            },
          },
        ],
      );
    }
  };

  const getDataAbsensi = async () => {
    try {
      const access_token = await AsyncStorage.getItem('userToken');
      const userID = await AsyncStorage.getItem('userID');
      axios
        .get(`https://absensibuana.my.id/restapipegawai/${userID}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(res => {
          setLoading(false);
          setDataAbsen(res.data.absensi);
          setDataAbsenKosong(false);
          isUpdatePassword();
        })
        .catch(err => {
          setLoading(true);
          console.error(err.response);
          if (err.response.status === 401) {
            signOut(`${err.response.data.message}`);
          }
          if (err.response.status === 404) {
            setDataAbsenKosong(true);
            isUpdatePassword();
          }
        });
    } catch (error) {
      if (error.response.status === 401) {
        await signOut(`${error.response.data.message}`);
      }
    }
  };

  useEffect(() => {
    getDataAbsensi();
  }, []);

  const pullToRefresh = useCallback(async () => {
    setRefresh(true);
    setDataAbsen([]);
    try {
      const access_token = await AsyncStorage.getItem('userToken');
      const userID = await AsyncStorage.getItem('userID');
      axios
        .get(`https://absensibuana.my.id/restapipegawai/${userID}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(res => {
          setRefresh(false);
          setDataAbsen(res.data.absensi);
          setDataAbsenKosong(false);
          isUpdatePassword();
        })
        .catch(err => {
          if (err.response.status === 401) {
            signOut(`${err.response.data.message}`);
          }
          if (err.response.status === 404) {
            setRefresh(false);
            setDataAbsenKosong(true);
            isUpdatePassword();
          }
        });
    } catch (error) {
      if (error.response.status === 401) {
        await signOut(`${error.response.data.message}`);
      }
    }
  });

  return (
    <SafeAreaView style={style.container}>
      {dataAbsen ? (
        <>
          <View style={lists.titleWrapper}>
            <Text style={lists.title}>Daftar Hadir</Text>
          </View>
          <View style={lists.wrapper}>
            <Text style={lists.headerCell}>No</Text>
            <Text style={lists.headerCell}>Tanggal</Text>
            <Text style={lists.headerCell}>Absen Masuk</Text>
            <Text style={lists.headerCell}>Absen Keluar</Text>
          </View>
          {dataAbsenKosong === true ? (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={pullToRefresh}
                />
              }>
              <View style={style.center}>
                <Image source={empty} />
                <Text style={lists.title}>Belum ada absen</Text>
              </View>
            </ScrollView>
          ) : (
            <FlatList
              data={dataAbsen}
              initialNumToRender={1}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <AbsenCell item={item} index={index} navigation={navigation} />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={pullToRefresh}
                />
              }
            />
          )}
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
    </SafeAreaView>
  );
}
