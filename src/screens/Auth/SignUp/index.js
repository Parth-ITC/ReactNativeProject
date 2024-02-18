import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IMAGES} from '../../../constants';
import useAuth from '../../../hooks/useAuth';
import {useDispatch, useSelector} from 'react-redux';
import {registerrequest} from '../../../redux/slices/authSlice';
import {navigation} from '../../../navigation/rootNavigation';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Textinput from '../../../components/Textinput';
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const {value} = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const onSignIn = () => {};
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Password is Required'),
  });
  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
      <View style={styles.imageBox}>
        <Image source={IMAGES.logo} style={styles.imageView} />
      </View>
      <Formik
        initialValues={{email: '', password: ''}}
        // validationSchema={LoginSchema}
        validate={validate}
        validateOnChange={true}
        onSubmit={values => {
          dispatch(registerrequest({url: 'Users', data: values}));
        }}>
        {({
          isValid,
          handleChange,
          errors,
          touched,
          values,
          handleSubmit,
          handleReset,
          handleBlur,
        }) => {
          return (
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
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                  />
                </View>
                {/* <TextInput
                  value={values.email}
                  placeholder="Enter Email Address"
                  onChangeText={handleChange('email')}
                  style={styles.inputBox}
                  placeholderTextColor={'grey'}
                /> */}
                {touched.email && errors.email && (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                )}
                {/* <TextInput
                  value={values.password}
                  placeholder="Enter Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  style={styles.inputBox}
                  placeholderTextColor={'grey'}
                /> */}
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
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    error={errors.password}
                    touched={touched.password}
                  />
                </View>
                {touched.password && errors.password && (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.btnView}
                onPress={() => {
                  handleSubmit();
                }}>
                <Text style={{color: 'white'}}>Submit</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
      <View style={styles.endView}>
        <Text
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Login
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
