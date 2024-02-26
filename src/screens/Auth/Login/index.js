import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IMAGES} from '../../../constants';
import useAuth from '../../../hooks/useAuth';
import {useDispatch, useSelector} from 'react-redux';
import {loginrequest} from '../../../redux/slices/authSlice';
import {navigation} from '../../../navigation/rootNavigation';
import NotificationHelper from '../../../helpers/NotificationHelper';
import analytics from '@react-native-firebase/analytics';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const {value} = useSelector(state => state.counter);
  const onSignIn = () => {};
  const dispatch = useDispatch();
  useEffect(() => {
    const getFcmToken = async () => {
      const token = await NotificationHelper.getNewFCMToken();
      console.log('Initial token:', token);
    };
    getFcmToken();
  }, []);

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
      <View style={styles.imageBox}>
        <Image source={IMAGES.logo} style={styles.imageView} />
      </View>
      <View style={styles.secondView}>
        <TextInput
          value={email}
          placeholder="Enter Email Address"
          onChangeText={text => {
            setEmail(text);
          }}
          style={styles.inputBox}
          placeholderTextColor={'grey'}
        />
        <TextInput
          value={password}
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={text => {
            setPassword(text);
          }}
          style={styles.inputBox}
          placeholderTextColor={'grey'}
        />
      </View>
      <TouchableOpacity
        style={styles.btnView}
        onPress={async () => {
          await analytics().logEvent('CLICK_SIGNIN', {
            email,
          });
          const callback = (error, response) => {
            if (error) {
              Alert.alert('Login Failed', error.message);
            } else {
              // Handle successful login, navigate to next screen or use response
              console.log('Login successful:', response);
            }
          };
          dispatch(
            loginrequest({
              url: 'Users/login',
              data: {email, password},
              auth: auth,
              callback,
            }),
          );
        }}>
        <Text style={{color: 'white'}}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.endView}>
        <Text
          onPress={() => {
            navigation.navigate('FirebaseSignUp');
          }}>
          SignUp
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
