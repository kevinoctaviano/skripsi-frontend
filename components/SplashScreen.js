import React from 'react';
import {View, Image} from 'react-native';
import logo from '../images/logo.png';
import {style} from '../assets/style';

export default function SplashScreen() {
  return (
    <View style={style.splashScreen}>
      <Image source={logo} style={style.splashScreenIcon} />
    </View>
  );
}
