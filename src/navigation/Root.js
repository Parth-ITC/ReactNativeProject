import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DetailsScreen from '../screens/DetailsScreen';
import ListScreen from '../screens/ListScreen';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
      <Stack.Navigator initialRouteName='List' screenOptions={{headerShown: false}}>
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
  );
};

export default Root;
