import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Header = props => {
  const {title, left, right, onRightPress, onLeftPress,rightBtntitle,rightIcon,leftIcon} = props
  return (
    <View style={styles.headerView}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {right && (
        <TouchableOpacity onPress={onRightPress} style={[styles.rightbtn,styles.shadowBtn]}>
          {/* <Text>{rightBtntitle ?? 'Add'}</Text> */}
          <Image source={rightIcon} style={styles.imageView} />
        </TouchableOpacity>
      )}
       {left && (
        <TouchableOpacity onPress={onLeftPress} style={[styles.leftbtn,styles.shadowBtn]}>
          {/* <Text>Back</Text> */}
          <Image source={leftIcon} style={styles.imageView} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: '#E5D4FF',
    alignItems: 'center',
    minHeight:50,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#6C22A6'
  },
  rightbtn: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    shadowColor: 'black',
    position: 'absolute',
    right: 15,
  },
  leftbtn: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    position: 'absolute',
    left: 15,
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
  imageView:{
    height:15,
    width:15,
    resizeMode:'contain'
  }
});
