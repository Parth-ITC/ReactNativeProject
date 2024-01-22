
import { Text } from "react-native"

const FunctionC =(props)=>{

    const {name, company} = props
  return(
    <>
    <Text style={{fontSize:12,fontWeight:'700'}}>Function Component</Text>
    <Text>{name}-{company}</Text>

    </>
  )
}
export default FunctionC;