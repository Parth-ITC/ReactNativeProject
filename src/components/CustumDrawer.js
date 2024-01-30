import {Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustumDrawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{height:100,width:100, backgroundColor:'red'}}></View>
      <DrawerItemList {...props} />
      {/* <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      /> */}
    </DrawerContentScrollView>
  );
};

export default CustumDrawer;

const styles = StyleSheet.create({});
