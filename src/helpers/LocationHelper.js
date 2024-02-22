import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
class LocationHelper {
  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const result = await Geolocation.requestAuthorization('whenInUse');
      return result === 'granted';
    } else if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err.message);
        return false;
      }
    }
  };

  getCurrentPosition = async (callback) => {
    const hasLocationPermission = await this.requestLocationPermission();
    console.log(hasLocationPermission);
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
            console.log(position);
          callback(position);
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 100000,
        },
      );
    }
  };

  watchPosition = async callback => {
    let watchId = Geolocation.watchPosition(
      pos => {
        // do something with the new location data
        callback(pos);
      },
      err => {
        // an error occurred while getting the location
        alert('Error: ' + err);
        console.log(err);
      },
      // {
      //   enableHighAccuracy: true,
      //   useSignificantChanges: false,
      //   interval: 10000,
      //   distanceFilter: 100,
        
      // },
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000, distanceFilter: 100}
    );

    return () => Geolocation.clearWatch(watchId);
  };
}

export default new LocationHelper();
