import {SafeAreaView, Text, View} from 'react-native';
import FunctionC from './src/components/FunctionC';
import ClassC from './src/components/ClassC';
import Root from './src/navigation/Root';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
      {/* <View style={{flex: 1, marginHorizontal: 10}}>
        <Text>Main Component</Text>
        <ClassC type={'jk'} />
      </View> */}
    </SafeAreaView>
  );
};
export default App;
