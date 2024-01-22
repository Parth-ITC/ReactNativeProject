import { SafeAreaView, Text } from "react-native"
import FunctionC from "./components/FunctionC";
import ClassC from "./components/ClassC";

const App =()=>{
  return(
    <SafeAreaView>
    <Text>Main Component</Text>
    <FunctionC name={'Parth'} company={'ITC'} />
    <ClassC type={'REACT NATIVE TRAINNNIG'} />
    </SafeAreaView>
  )
}
export default App;