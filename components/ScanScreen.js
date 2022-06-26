import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Alert, Image} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './AuthContext';
import axios from 'axios';
import scan from '../images/scan.png';

export default function ScanScreen() {
  const [isBarcodeRead, setIsBarcodeRead] = useState(false);
  const [barcodeType, setBarcodeType] = useState('');
  const [message, setMessage] = useState('');
  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    if (isBarcodeRead) {
      Alert.alert(barcodeType, message, [
        {
          text: 'OK',
          onPress: () => {
            // reset everything
            setIsBarcodeRead(false);
            setBarcodeType('');
            setMessage('');
          },
        },
      ]);
    }
  }, [isBarcodeRead, barcodeType, message]);

  const onBarcodeRead = async barcodes => {
    try {
      const access_token = await AsyncStorage.getItem('userToken');
      const userID = await AsyncStorage.getItem('userID');

      const body = {
        karyawan: userID,
      };
      axios
        .post(`${barcodes.data}`, body, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(res => {
          if (isBarcodeRead === false) {
            setIsBarcodeRead(true);
            setBarcodeType(barcodes.type);
            setMessage(res.data.messages.success);
          }
        })
        .catch(err => {
          if (isBarcodeRead === false) {
            if (err.response.status === 400) {
              setIsBarcodeRead(true);
              setBarcodeType(barcodes.type);
              setMessage(err.response.data.messages.error);
            }
            if (err.response.status === 401) {
              signOut(`${err.response.data.message}`);
            }
          }
        });
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 401) {
        await signOut(`${error.response.data.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        style={styles.preview}
        onRead={onBarcodeRead}
        reactivate={true}
        reactivateTimeout={5000}
        showMarker={true}
        customMarker={<Image source={scan} style={styles.scan} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scan: {
    width: 180,
    height: 180,
  },
});