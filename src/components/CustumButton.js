import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

const CustumButton = (props) => {
    const {btnName,onPress} = props
  return (
    <TouchableOpacity
      style={styles.btnView}
      onPress={onPress}>
      <Text style={{color: 'white'}}>{btnName}</Text>
    </TouchableOpacity>
  );
};

export default CustumButton;

const styles = StyleSheet.create({
  btnView: {
    backgroundColor: COLORS.btnColor,
    marginVertical: 15,
    marginHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
