import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

class NotificationHelper {
  async initialize() {
    // Request permission for iOS
    if (Platform.OS === 'ios') {
      await messaging().requestPermission();
    } else {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }

    // Add a handler for receiving notifications while the app is in foreground
    messaging().onMessage(async remoteMessage => {
      // Process your remote message here
      console.log(
        'Received a message while the app is in the foreground:',
        remoteMessage,
      );
      // Display a local notification
      this.showNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });

    // Handle notifications that are opened when the app is in the background or closed
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      // You can handle navigation to a specific screen here
    });

    // Check whether the app was opened from a notification
    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      console.log('Notification caused app to open:', initialNotification);
      // You can handle navigation to a specific screen here
    }
  }

  async requestNotificationPermission() {
    let token;
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (!enabled) {
          throw new Error('User has not granted permission');
        }
        token = await messaging().getToken();
      } else if (Platform.OS === 'android') {
        const authStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        const fcmToken = await messaging().getToken();
        if (!fcmToken) {
          console.log('No FCM Token yet!');
          throw new Error('User has not granted permission');
        } else {
          token = fcmToken;
        }

        //         const enabled = authStatus === 'granted';
        //         if (!enabled) {
        //             token = (await messaging().getToken()).toString();
        // console.log(token,'TOKEN');
        //           throw new Error('User has not granted permission');
        //           // Show an error message to the user if token is null
        //         }
        // token = (await messaging().getToken()).toString();
      }
      return token;
    } catch (err) {}
  }
  getNewFCMToken = async () => {
    try {
      const fcmToken = await this.requestNotificationPermission();
      if (fcmToken) {
        console.log(fcmToken);
      }
      return fcmToken;
    } catch (error) {
      console.error('Error getting new FCM token:', error);
    }
  };

  showNotification(title, body) {
    // Implement your notification display logic here
    // You can use libraries like react-native-push-notification or create your own notification component
    console.log('Notification received:', title, body);
  }
}

export default new NotificationHelper();
