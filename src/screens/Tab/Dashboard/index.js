import { View, Text, Button } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const Dashboard = ({navigation}) => {
  return (
    <View>
      <Text>index</Text>
      <Icon name="rocket" size={30} color="#900" />
      <Button title='List' onPress={()=>{navigation.navigate('List')}} />
    </View>
  )
}

export default Dashboard