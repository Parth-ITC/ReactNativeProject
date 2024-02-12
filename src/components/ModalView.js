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
import React, {useEffect, useMemo, useState} from 'react';
import Header from './Header';
import {ICONS} from '../constants';
import DatePicker from 'react-native-date-picker';

const ModalView = props => {
  const {isModalopen, onPress, onPressSubmit} = props;
  const [bookData, setBookdata] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [btnVisible, setBtnvisible] = useState(false);
  const [open, setOpen] = useState(false);
  
  function isNotEmptyOrNull(value) {
    return value !== '' && value !== null;
  }

  function isValidDate(value) {
    let dateObj = new Date(value);
    return !isNaN(dateObj);
  }
  useEffect(() => {
    if (
      Object.values(bookData).every(
        data => isNotEmptyOrNull(data) || isValidDate(data),
      )
    ) {
      setBtnvisible(true);
    } else {
      setBtnvisible(false);
    }
  }, [bookData]);
  const getDate = useMemo(() => {
    let tempDate = bookData?.date.toString().split(' ');
    return bookData?.date !== ''
      ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
      : '';
  }, [bookData?.date]);
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
        <Header
          title={'Add New Book'}
          right={true}
          rightIcon={ICONS.close_icon}
          onRightPress={onPress}
          rightBtntitle={'Close'}
        />
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
              style={styles.inputTextview}
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
              style={styles.inputView}
              placeholderTextColor={'grey'}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setOpen(!open);
            }}
            style={[
              styles.inputTextview,
              {marginHorizontal: 20, marginVertical: 10},
            ]}>
            <Text>{bookData?.date ? getDate : 'Add Date'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!btnVisible}
            style={{
              backgroundColor: btnVisible ? '#D0A2F7' : '#F1EAFF',
              marginVertical: 5,
              marginHorizontal: 15,
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              onPressSubmit(bookData);
            }}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            mode="date"
            date={bookData?.date ? new Date(bookData?.date) : new Date()}
            onConfirm={date => {
              setOpen(false);
              console.log(typeof date);
              setBookdata(prevState => ({
                ...prevState,
                date: date,
              }));
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
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
  inputView: {
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  inputTextview: {
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});
