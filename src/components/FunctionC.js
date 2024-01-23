import {useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ClassC from './ClassC';

const FunctionC = props => {
  const {name, company} = props;
  const [yourname, setYourName] = useState(name);
  const [number, setYourNumber] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={[0]}
        style={{flex: 1}}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                height: 50,
                backgroundColor: 'orange',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Core Components</Text>
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 12, fontWeight: '700'}}>
                Function Component
              </Text>
              <Text>
                {name}-{company}
              </Text>
              <TextInput
                placeholder="Write your Name"
                value={yourname}
                onChangeText={text => {
                  setYourName(text);
                }}
                style={{
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  marginVertical: 5,
                }}
                placeholderTextColor={'grey'}
              />
              <TextInput
                placeholder="Write your Number"
                value={number}
                onChangeText={text => {
                  setYourNumber(text);
                }}
                style={{
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  marginVertical: 5,
                }}
                placeholderTextColor={'grey'}
                keyboardType="numeric"
              />
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  marginVertical: 5,
                  paddingVertical: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  paddingHorizontal: 10,
                  borderRadius: 50,
                }}
                onPress={() => {
                  alert('button pressed');
                }}>
                <Text style={{color: 'white'}}>Press Me!</Text>
              </TouchableOpacity>
              <View style={{width: '100%'}}>
                <Button
                  title="Button Press"
                  color="#f194ff"
                  onPress={() => Alert.alert('Button pressed')}
                />
              </View>
              <Image
                style={{height:100,width:100}}
                resizeMode='contain'
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
              />
            </View>
          );
        }}
        ListFooterComponent={()=>{
          return(
            <ClassC type={'REACT NATIVE TRAINNNIG'} />
          )
        }}
      />
    </View>
  );
};
export default FunctionC;
