import {
  Alert,
  Button,
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
import Loader from '../../../components/Loader';
import {loginUser} from '../../../helpers/firebaseAuth';
import notifee, {AndroidImportance} from '@notifee/react-native';
import NotificationSounds, { playSampleSound } from  'react-native-notification-sounds';

const FirebaseLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const getFcmToken = async () => {
      const token = await NotificationHelper.getNewFCMToken();
      console.log('Initial token:', token);
      // const soundsList = await NotificationSounds.getNotifications(
      //   'notification',
      // );
      // playSampleSound(soundsList[11])
    };
    getFcmToken();
  }, []);

  const handleLogin = async () => {
    setIsloading(true);
    try {
      await loginUser(email, password);
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setIsloading(false);
    }
  };
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    const soundsList = await NotificationSounds.getNotifications(
      'notification',
    );
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: '1234',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      // sound:soundsList[11].url,
    });
// console.log(soundsList[11].url);
    // Display a notification
    await notifee.displayNotification({
      title: `<p style="color: #4caf50;"><b>${'title'}</span></p></b></p> &#128576`,
      body: 'Main body content of the notification',
      android: {
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
        largeIcon:
          'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg',
        // importance: AndroidImportance.HIGH
      },
    });
  }

  return (
    <>
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
        <TouchableOpacity style={styles.btnView} onPress={handleLogin}>
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
        <Button
          title="Display Notification"
          onPress={() => {
            onDisplayNotification();
          }}
        />
      </KeyboardAwareScrollView>
      <Loader visible={isLoading} />
    </>
  );
};

export default FirebaseLogin;
