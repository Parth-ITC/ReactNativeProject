import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const BookView = (props) => {
    const {item,onPress} = props
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={()=>{onPress(item)}}
      style={[styles.outerView, styles.shadowBtn]}>
        <Text style={styles.boldText}>Title: <Text style={styles.lightfont}>{item?.title}</Text></Text>
        <Text style={styles.boldText}>Description: <Text style={styles.lightfont}>{item?.description ?? item.body}</Text></Text>
    </TouchableOpacity>
  );
};

export default BookView;

const styles = StyleSheet.create({
  outerView: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#DCBFFF',
  },
  shadowBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  boldText:{
    fontSize:12,
    fontWeight:'bold'
  },
  lightfont:{
    fontSize:12,
    fontWeight:'300'
  }
});
