import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ListScreen from '../screens/ListScreen';
import CustumDrawer from '../components/CustumDrawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNav from './TabNav';
import PokemonScreen from '../screens/Pokemon';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export const DeepScreen = props => {
  return <View style={{flex: 1, backgroundColor: 'pink'}}></View>;
};



const DrawerNav = props => {
  return (
    <Drawer.Navigator
    initialRouteName='Tab'
      screenOptions={{headerShown: false, drawerType: 'front'}}
      drawerContent={CustumDrawer}>
      <Drawer.Screen name="Tab"  component={TabNav} />
      <Drawer.Screen name="PokemonScreen"  component={PokemonScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
