import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from './components/AuthContext';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Screen
import SplashScreen from './components/SplashScreen';
import Login from './components/Login';
import TabNavigator from './components/TabNavigator';
import ChangePassword from './components/ChangePassword';
import AbsenKeluar from './components/AbsenKeluar';

const Stack = createNativeStackNavigator();

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            userID: action.userID,
            isUpdate: action.isUpdate,
            isLoading: false,
          };
        case 'SIGN_IN':
          if (action.token) {
            AsyncStorage.setItem('userToken', action.token);
            AsyncStorage.setItem('userID', action.userID);
            AsyncStorage.setItem('isUpdate', action.isUpdate);
            ToastAndroid.show('Berhasil Login!', ToastAndroid.SHORT);
          }
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userID: action.userID,
            isUpdate: action.isUpdate,
          };
        case 'SIGN_OUT':
          AsyncStorage.removeItem('userToken');
          AsyncStorage.removeItem('userID');
          AsyncStorage.removeItem('isUpdate');
          ToastAndroid.show(`${action.message}`, ToastAndroid.SHORT);
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userID: null,
            isUpdate: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userID: null,
      isUpdate: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let userID;
      let isUpdate;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await AsyncStorage.getItem('userToken');
        userID = await AsyncStorage.getItem('userID');
        isUpdate = await AsyncStorage.getItem('isUpdate');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({
        type: 'RESTORE_TOKEN',
        token: userToken,
        userID: userID,
        isUpdate: isUpdate,
      });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (token, userID, isUpdate) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        // console.log('Token :', token);
        dispatch({
          type: 'SIGN_IN',
          token: token,
          userID: userID,
          isUpdate: isUpdate,
        });
      },
      signOut: async message => dispatch({type: 'SIGN_OUT', message: message}),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
          ) : state.userToken == null ? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          ) : (
            <>
              <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{headerShown: false}}
              />
              <Stack.Screen name="AbsenKeluar" component={AbsenKeluar} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
