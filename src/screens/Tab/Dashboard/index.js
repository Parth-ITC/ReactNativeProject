import {View, Text, Button} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../../../components/Header';
import { styles } from './styles';
const Dashboard = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title={'Dashboard'} />
      <Text>index</Text>
      <Icon name="rocket" size={30} color="#900" />
      <Button
        title="List"
        onPress={() => {
          navigation.navigate('List');
        }}
      />
    </View>
  );
};

export default Dashboard;
