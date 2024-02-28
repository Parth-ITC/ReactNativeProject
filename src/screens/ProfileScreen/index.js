import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import Header from '../../components/Header';
import {ICONS} from '../../constants';
import {navigation} from '../../navigation/rootNavigation';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePickerModal from '../../components/ImagepickerModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustumButton from '../../components/CustumButton';
import moment from 'moment';
import AuthContext from '../../context/AuthContext';
import FirestoreHelper from '../../helpers/FireStoreHelper';
import useFirestoreListener from '../../hooks/useFirestoreListener';
import Loader from '../../components/Loader';
import {isObjectEmpty} from '../../helpers/helper';
import withLoader from '../../hoc/withLoader';

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

const ProfileScreen = props => {
  const {setLoading} = props;
  const {authData} = useContext(AuthContext);
  const {
    data: userData,
    error,
    loading,
  } = useFirestoreListener('Users', authData?.uid);

  useEffect(()=>{
    setLoading(loading)
  },[loading])

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


  useEffect(() => {
    if (!isObjectEmpty(userData)) {
      setProfileData({...userData});
    }
  }, [userData]);

  const handleSetValue = (key, value) => {
    setProfileData({
      ...profileData,
      [key]: value,
    });
  };

  const getDate = useMemo(() => {
    if (profileData?.birthday) {
      return profileData?.birthday !== ''
        ? moment(profileData?.birthday?.toDate()).format('DD MMM YYYY')
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
    } else {
      return 'https://amaxfireandsecurity.co.uk/wp-content/uploads/2023/12/profile-pic-MD.jpg';
    }
  }, [profileData?.image]);

  const updateProfile = async () => {
    setLoading(true);
    try {
      await FirestoreHelper.setDocument(`Users/${authData?.uid}`, {
        ...profileData,
        email: authData?.email,
        id: authData?.uid,
      });
    } catch (err) {
      console.log('Error in updating the user data', err);
    } finally {
      setLoading(false)
    }
  };

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
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.container}>
        <View key={'scroolIndex'} style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setImagePicker(true);
            }}
            style={styles.imageOuterview}>
            <Image source={{uri: getImage}} style={styles.imageView} />
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
        <CustumButton
          btnName={'Update Profile'}
          onPress={() => {
            updateProfile();
          }}
        />
      </KeyboardAwareScrollView>
      <DatePicker
        modal
        open={open}
        mode="date"
        maximumDate={new Date()}
        date={
          profileData?.birthday ? new Date(profileData?.birthday?.toDate()) : new Date()
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

export default withLoader(ProfileScreen);
