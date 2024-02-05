import {View, Text, Button} from 'react-native';
import React from 'react';
import useAuth from '../../../hooks/useAuth';

const Settings = () => {
  const auth = useAuth();
  return (
    <View>
      <Text>index</Text>
      <Button
        title="Log Out"
        onPress={() => {
          auth.signOut();
        }}
      />
    </View>
  );
};

export default Settings;
