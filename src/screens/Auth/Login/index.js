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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const onSignIn = () =>{
    
  }

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
      <View style={styles.imageBox}>
        <Image source={IMAGES.logo} style={styles.imageView} />
      </View>
      <View style={styles.secondView}>
        <TextInput
          value={email}
          placeholder="Enter Email Address"
          onChangeText={text => {
            setEmail(text);
          }}
          style={styles.inputBox}
          placeholderTextColor={'grey'}
        />
        <TextInput
          value={password}
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={text => {
            setPassword(text);
          }}
          style={styles.inputBox}
          placeholderTextColor={'grey'}
        />
      </View>
      <TouchableOpacity
        style={styles.btnView}
        onPress={() => {
          auth.signIn();
        }}>
        <Text style={{color: 'white'}}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default Login;
