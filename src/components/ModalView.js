import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './Header';
import { ICONS } from '../constants';

const ModalView = props => {
  const {isModalopen, onPress,onPressSubmit} = props;
  const [bookData, setBookdata] = useState({title: '', description: ''});
  const [btnVisible, setBtnvisible] = useState(false);

  useEffect(() => {
    if (Object.values(bookData).every(data => data?.trim()?.length != 0)) {
      setBtnvisible(true);
    } else {
      setBtnvisible(false);
    }
  }, [bookData]);
  return (
    <Modal
      visible={isModalopen}
      transparent={false}
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={() => {
        onPress();
      }}
      style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <View style={{flex: 1}}>
        <Header title={'Add New Book'} right={true} rightIcon={ICONS.close_icon} onRightPress={onPress} rightBtntitle={'Close'} />
        {/* <View style={styles.headerView}>
          <Text style={styles.titleText}>Add New Book</Text>
        </View> */}
        <ScrollView style={styles.centerView}>
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <TextInput
              placeholder="Add Book Title"
              value={bookData?.title}
              onChangeText={text => {
                setBookdata(prevState => ({
                  ...prevState,
                  title: text,
                }));
              }}
              style={{
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 1,
                paddingHorizontal: 10,
                marginVertical: 5,
              }}
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <TextInput
              placeholder="Add Book Description"
              multiline
              value={bookData?.description}
              onChangeText={text => {
                setBookdata(prevState => ({
                  ...prevState,
                  description: text,
                }));
              }}
              numberOfLines={4}
              style={{
                height: 100,
                paddingTop: 10,
                paddingBottom:10,
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 1,
                paddingHorizontal: 10,
                textAlignVertical:'top',
              }}
              placeholderTextColor={'grey'}
            />
          </View>
          <TouchableOpacity
            disabled={!btnVisible}
            style={{
              backgroundColor: btnVisible ? '#D0A2F7':"#F1EAFF",
              marginVertical: 5,
              marginHorizontal: 15,
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            onPress={() => {
                onPressSubmit(bookData)
            }}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  headerView: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerView: {
    flex: 1,
  },
});
