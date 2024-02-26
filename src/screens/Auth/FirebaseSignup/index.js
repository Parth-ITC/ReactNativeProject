import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IMAGES} from '../../../constants';
import useAuth from '../../../hooks/useAuth';
import {useDispatch, useSelector} from 'react-redux';
import {registerrequest} from '../../../redux/slices/authSlice';
import {navigation} from '../../../navigation/rootNavigation';
import {Formik, ErrorMessage, Form, Field, FastField, FieldArray} from 'formik';
import Textinput from '../../../components/Textinput';
import {registerUser} from '../../../helpers/firebaseAuth';
import Loader from '../../../components/Loader';

const FirebaseSignup = () => {
  const dispatch = useDispatch();
  const [singupData, setSignupdata] = useState({email: '', password: ''});
  const [isLoading, setIsloading] = useState(false);

  const handleChange = (type, value) => {
    setSignupdata(prevstate => ({...prevstate, [type]: value}));
  };
  const handleSubmit = async () => {
    setIsloading(true);
    try {
      await registerUser(singupData);
    } catch (error) {
      Alert.alert(error.message)
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView bounces={false} style={styles.container}>
        <View style={styles.imageBox}>
          <Image source={IMAGES.logo} style={styles.imageView} />
        </View>
        <>
          <View style={styles.secondView}>
            <View
              style={{
                marginVertical: 5,
                width: '100%',
              }}>
              <Textinput
                icon="mail"
                placeholder="Enter your email"
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                keyboardAppearance="dark"
                onChangeText={text => handleChange('email', text)}
                value={singupData?.email}
              />
            </View>
            <View
              style={{
                marginVertical: 5,
                width: '100%',
              }}>
              <Textinput
                icon="key"
                placeholder="Enter your password"
                secureTextEntry
                autoCompleteType="password"
                autoCapitalize="none"
                keyboardAppearance="dark"
                onChangeText={text => handleChange('password', text)}
                value={singupData?.password}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.btnView}
            onPress={() => {
              handleSubmit();
            }}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </>
        <View style={styles.endView}>
          <Text
            onPress={() => {
              navigation.navigate('FirebaseLogin');
            }}>
            Login
          </Text>
        </View>
      </KeyboardAwareScrollView>
      <Loader visible={isLoading} />
    </>
  );
};

export default FirebaseSignup;
