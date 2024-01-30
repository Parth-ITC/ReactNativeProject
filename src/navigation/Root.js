import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import DrawerNav, { DeepScreen } from './Drawer';
import TabNav from './TabNav';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import ClassC from '../components/ClassC';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    // <>
    // <ClassC />
    // </>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Auth' component={AuthStack} />
        <Stack.Screen name='Home' component={HomeStack} />
      </Stack.Navigator>
  );
};

export default Root;
