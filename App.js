import {SafeAreaView, Text, View} from 'react-native';
import FunctionC from './src/components/FunctionC';
import ClassC from './src/components/ClassC';
import Root from './src/navigation/Root';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, marginHorizontal: 10}}>
        <Text>Main Component</Text>
        <FunctionC name={'Parth'} company={'ITC'} />
      </View>
      {/* <Root /> */}
    </SafeAreaView>
  );
};
export default App;
