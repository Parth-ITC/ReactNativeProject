import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import Header from '../../components/Header';
import {ICONS} from '../../constants';
import {navigation} from '../../navigation/rootNavigation';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePickerModal from '../../components/ImagepickerModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ProfileData = [
  {title: 'firstName', type: 'text'},
  {title: 'lastName', type: 'text'},
  {title: 'birthday', type: 'datepicker'},
  {title: 'gender', type: 'picker'},
  {title: 'location', type: 'multiLine'},
];
const items = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    birthday: null,
    gender: 'Male',
    location: '',
    image: '',
  });
  const [open, setOpen] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [openImagePicker, setImagePicker] = useState(false);

  const handleSetValue = (key, value) => {
    setProfileData({
      ...profileData,
      [key]: value,
    });
  };

  const getDate = useMemo(() => {
    if (profileData?.birthday) {
      let tempDate = profileData?.birthday.toString().split(' ');
      return profileData?.birthday !== ''
        ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
        : '';
    }
  }, [profileData?.birthday]);
  const getGender = useMemo(() => {
    if (profileData?.gender) {
      return profileData?.gender == 'Male'
        ? {label: 'Male', value: 'male'}
        : {label: 'Female', value: 'female'};
    }
  }, [profileData?.gender]);

  const getImage = useMemo(() => {
    if (profileData?.image) {
      return profileData?.image;
    }else{
        return 'https://amaxfireandsecurity.co.uk/wp-content/uploads/2023/12/profile-pic-MD.jpg'
    }
  }, [profileData?.image]);

  return (
    <View style={styles.container}>
      <Header
        title={'ProfileScreen'}
        left={true}
        leftIcon={ICONS.back_icon}
        onLeftPress={() => {
          navigation.goBack(null);
        }}
      />
      <KeyboardAwareScrollView bounces={false} style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setImagePicker(true);
            }}
            style={styles.imageOuterview}>
            <Image
              source={{uri: getImage}}
              style={styles.imageView}
            />
          </TouchableOpacity>
          <View style={styles.formField}>
            <View style={styles.labelView}>
              <Text style={styles.label}>FIRST NAME</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={profileData.firstName}
              onChangeText={value => handleSetValue('firstName', value)}
              placeholderTextColor="#ccc"
              autoCorrect={false}
            />
          </View>
          <View style={styles.formField}>
            <View style={styles.labelView}>
              <Text style={styles.label}>LAST NAME</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={profileData.lastName}
              onChangeText={value => handleSetValue('lastName', value)}
              placeholderTextColor="#ccc"
              autoCorrect={false}

            />
          </View>
          <View style={styles.formField}>
            <View style={styles.labelView}>
              <Text style={styles.label}>BIRTHDAY</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setOpen(!open);
              }}
              style={[styles.input]}>
              <Text>
                {profileData?.birthday ? getDate : 'Select Birth Date'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formField}>
            <View style={styles.labelView}>
              <Text style={styles.label}>GENDER</Text>
            </View>
            <DropDownPicker
              open={openPicker}
              containerStyle={[styles.input]}
              value={profileData?.gender?.toLowerCase()}
              items={items}
              setOpen={setOpenPicker}
              onSelectItem={value => {
                setProfileData(prevState => ({
                  ...prevState,
                  gender: value?.label,
                }));
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <DatePicker
        modal
        open={open}
        mode="date"
        maximumDate={new Date()}
        date={
          profileData?.birthday ? new Date(profileData?.birthday) : new Date()
        }
        onConfirm={date => {
          setOpen(false);
          setProfileData(prevState => ({
            ...prevState,
            birthday: date,
          }));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <ImagePickerModal
        visible={openImagePicker}
        onClose={() => {
          setImagePicker(false);
        }}
        onImageSelected={value => {
          setImagePicker(false);
          setProfileData(prevState => ({
            ...prevState,
            image: value,
          }));
        }}
      />
    </View>
  );
};

export default ProfileScreen;
