import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import LocationHelper from '../../helpers/LocationHelper';
import {Icon} from 'react-native-vector-icons/dist/FontAwesome6';
const MapScreen = () => {
  const [currentPosition, setCurrentposition] = useState(null);

  useEffect(() => {
    LocationHelper.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setCurrentposition({latitude, longitude});
    });
    LocationHelper.watchPosition(position => {
      const {latitude, longitude} = position.coords;
      setCurrentposition({latitude, longitude});
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: currentPosition?.latitude || 37.785304,
          longitude: currentPosition?.longitude || -122.43773,
          latitudeDelta: 0.922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: currentPosition?.latitude || 37.785304,
            longitude: currentPosition?.longitude || -122.43773,
          }}
          anchor={{x: 0.5, y: 0.5}}>
          <Image
            source={require('../../assets/icons/hatchback.png')}
            style={{height: 40, width: 40}}
          />
        </Marker>
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
