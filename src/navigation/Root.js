import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import useAuth from '../hooks/useAuth';
import {COLORS} from '../constants';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/Splash/SplashScreen';
import { navigationRef } from './rootNavigation';

const Stack = createNativeStackNavigator();

const Root = () => {
  const {authData, loading} = useAuth();
  if (loading) {
    return (
      <SplashScreen />
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar/>
      <NavigationContainer ref={navigationRef}>
        {authData?.token ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Root;
