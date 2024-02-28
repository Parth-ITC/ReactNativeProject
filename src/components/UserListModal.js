import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from './Header';
import { ICONS } from '../constants';

const UserListModal = props => {
  const {isModalopen,headerName,children,onPress} = props;

  return (
    <Modal
      visible={isModalopen}
      transparent={false}
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={onPress}
      style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <View style={{flex: 1}}>
        <Header
          title={headerName}
          right={true}
          rightIcon={ICONS.close_icon}
          onRightPress={onPress}
          rightBtntitle={'Close'}
        />
        {children}
      </View>
    </Modal>
  );
};

export default UserListModal;

const styles = StyleSheet.create({});
