import {StyleSheet} from 'react-native';

const lists = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: 15,
  },
  cell: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    height: 70,
    padding: 5,
    backgroundColor: '#fff',
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    padding: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: 15,
  },
  belumAbsen: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  textBelumAbsen: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginTop: 10,
  },
});

export {lists};
