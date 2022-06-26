import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  title: {
    fontSize: 32,
    color: '#c8d6e5',
    fontFamily: 'Poppins-Bold',
  },
  subTitle: {
    color: '#c8d6e5',
    marginBottom: 50,
    fontFamily: 'Poppins-Regular',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#FFF',
    marginTop: 5,
    width: '80%',
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
  },
  password: {
    borderBottomWidth: 2,
    borderColor: '#FFF',
    marginTop: 5,
    width: '80%',
    flexDirection: 'row',
  },
  textPassword: {
    marginTop: 5,
    width: '80%',
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
  },
  buttonSignIn: {
    backgroundColor: '#00d2d3',
    marginTop: 30,
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  textSignIn: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
  },
  white: {
    color: '#FFF',
  },
  backgroundImage: {
    flex: 1,
  },
  viewError: {
    marginTop: 5,
    backgroundColor: '#eb4d4b',
    borderRadius: 5,
    width: '80%',
    padding: 5,
  },
  error: {
    color: '#dff9fb',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  TableText: {
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#dff9fb',
  },
  iconPassword: {
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
  },
  passwordOld: {
    marginTop: 5,
    width: '80%',
    fontFamily: 'Poppins-Regular',
  },
  passwordNew: {
    marginTop: 5,
    width: '80%',
    fontFamily: 'Poppins-Regular',
  },
  changePassword: {
    borderBottomWidth: 2,
    marginTop: 5,
    width: '80%',
    flexDirection: 'row',
  },
  viewChangePassword: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dff9fb',
  },
  splashScreen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#dff9fb',
  },
  splashScreenIcon: {
    width: 200,
    height: 200,
    marginTop: 100,
  },
  loginScreenIcon: {
    width: 140,
    height: 140,
  },
  ubahPassword: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});

export {style};
