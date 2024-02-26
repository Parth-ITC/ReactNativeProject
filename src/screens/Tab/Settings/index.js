import {View, Text, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import styles from './styles';
import {navigation} from '../../../navigation/rootNavigation';
import Header from '../../../components/Header';
import {logoutUser} from '../../../helpers/firebaseAuth';

const Settings = () => {
  const auth = useAuth();
  return (
    <View>
      <Header title={'Settings'} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProfileScreen');
        }}
        style={styles.profileView}>
        <Text>View Profile</Text>
      </TouchableOpacity>
      <Button
        title="Log Out"
        onPress={async () => {
          try {
            await logoutUser();
          } catch (error) {
          } finally {
            auth.signOut();
          }
        }}
      />
    </View>
  );
};

export default Settings;
