import {
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
import * as Yup from 'yup';
import Textinput from '../../../components/Textinput';
import {Picker} from '@react-native-picker/picker';
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.friends || !values.friends.length) {
    errors.friends = 'At least one friend is required';
  } else {
    values.friends.forEach((friend, index) => {
      if (!friend) {
        if (!errors.friends) {
          errors.friends = [];
        }
        errors.friends[index] = 'Friend name is required';
      }
    });
  }

  return errors;
};
const SignUp = () => {
  const dispatch = useDispatch();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Password is Required'),
  });
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const validateAsync = value => {
    return sleep(2000).then(() => {
      if (['admin', 'null', 'god'].includes(value)) {
        return 'Nice try';
      }
    });
  };
  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
      <View style={styles.imageBox}>
        <Image source={IMAGES.logo} style={styles.imageView} />
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
          color: 'red',
          friends: [''],
          username: '',
        }}
        validationSchema={LoginSchema}
        // validate={validate}
        // validateOnChange={false}
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
          setFieldError,
          validateField,
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
                    value={values.email}
                    touched={touched.email}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                )}
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

                {/* <ErrorMessage
                  name="password"
                  component={Text}
                /> */}
                {/* <ErrorMessage name="password">
                  {() => {
                    return (
                      <Text style={{color: 'red'}}>{errors.password}</Text>
                    );
                  }}
                </ErrorMessage> */}

                {/* Arrray Used In Form Start*/}

                {/* <FieldArray name="friends">
                  {arrayHelpers => (
                    <View>
                      {values.friends.map((friend, index) => (
                        <View key={index}>
                          <Field name={`friends.${index}`}>
                            {({field}) => (
                              <TextInput
                                onChangeText={field.onChange(field.name)}
                                // onBlur={field.onBlur(field.name)}
                                onBlur={() => {
                                  // Manually trigger validation for the current field
                                  const fieldName = `friends.${index}`;
                                  if (
                                    errors &&
                                    errors.friends &&
                                    errors.friends[index]
                                  ) {
                                    setFieldError(
                                      fieldName,
                                      errors.friends[index],
                                    );
                                  }
                                }}
                                value={field.value}
                                placeholder="Enter a friend's name"
                              />
                            )}
                          </Field>
                          {errors &&
                            errors.friends &&
                            typeof errors.friends === 'object' &&
                            errors.friends[index] && (
                              <Text style={{color: 'red'}}>
                                {errors.friends[index]}
                              </Text>
                            )}
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}>
                            <Button
                              onPress={() => {
                                arrayHelpers.remove(index);
                              }}
                              title="-"
                            />
                            <Button
                              onPress={() => arrayHelpers.insert(index, '')}
                              title="+"
                            />
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </FieldArray>
                {errors &&
                  errors.friends &&
                  typeof errors.friends === 'string' && (
                    <Text style={{color: 'red'}}>{errors.friends}</Text>
                  )} */}
                {/* Arrray Used In Form Complete*/}

                {/* Fastfiled Used In Form */}

                {/* <FastField name="password">
                  {({field}) => {
                    console.log(field, 'FAST FIELD');
                    return (
                      <Textinput
                        icon="key"
                        placeholder="Enter your password"
                        secureTextEntry
                        autoCompleteType="password"
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                        onBlur={field.onBlur('password')}
                        onChangeText={field.onChange('password')}
                        error={errors.password}
                        touched={touched.password}
                      />
                    );
                  }}
                </FastField> */}
                {/* <Field name="password">
                  {({field}) => {
                    return (
                      <Textinput
                        icon="key"
                        placeholder="Enter your password"
                        secureTextEntry
                        autoCompleteType="password"
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                        onBlur={field.onBlur('password')}
                        onChangeText={field.onChange('password')}
                        error={errors.password}
                        touched={touched.password}
                      />
                    );
                  }}
                </Field> */}

                {/* Fastfiled Used In Form */}
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
