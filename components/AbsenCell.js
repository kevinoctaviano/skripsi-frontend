import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {lists} from '../assets/lists';
import moment from 'moment';

export default function AbsenCell({index, item, navigation}) {
  return (
    <View style={lists.wrapper}>
      {item.absen_keluar === null ? (
        <>
          <Text style={lists.cell}>{++index}</Text>
          <Text style={lists.cell}>
            {moment(item.absen_masuk).format('dddd, MMM Do YYYY')}
          </Text>
          <Text style={lists.cell}>
            {moment(item.absen_masuk).format('h:mm a')}
          </Text>
          <TouchableOpacity
            style={lists.belumAbsen}
            onPress={() => navigation.navigate('AbsenKeluar', {id: item.id})}>
            <Text style={lists.textBelumAbsen}>Absen Keluar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={lists.cell}>{++index}</Text>
          <Text style={lists.cell}>
            {moment(item.absen_masuk).format('dddd, MMM Do YYYY')}
          </Text>
          <Text style={lists.cell}>
            {moment(item.absen_masuk).format('h:mm a')}
          </Text>
          <Text style={lists.cell}>
            {moment(item.absen_keluar).format('h:mm a')}
          </Text>
        </>
      )}
    </View>
  );
}
