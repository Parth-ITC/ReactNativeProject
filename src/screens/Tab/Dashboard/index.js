import { View, Text, Button } from 'react-native'
import React from 'react'

const Dashboard = ({navigation}) => {
  return (
    <View>
      <Text>index</Text>
      <Button title='List' onPress={()=>{navigation.navigate('List')}} />
    </View>
  )
}

export default Dashboard