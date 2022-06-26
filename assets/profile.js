import {StyleSheet} from 'react-native';

const profile = StyleSheet.create({
  header: {
    padding: 10,
    width: '100%',
    backgroundColor: '#7ed6df',
    height: 150,
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: -50,
  },
  username: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginTop: 5,
  },
  pictureCenter: {alignItems: 'center'},
  card: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
  },
  buttonChangePassword: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#6ab04c',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
  },
  buttonLogout: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#eb4d4b',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    marginBottom: 80,
  },
  textLogout: {
    marginLeft: 10,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  textProfile: {marginLeft: 10, fontFamily: 'Poppins-Regular'},
});

export {profile};
