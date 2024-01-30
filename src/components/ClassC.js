import React from "react";
import { Text, TextInput } from "react-native";

class ClassC extends React.Component {
    constructor(props){
        super(props)
        this.state={
inoutValue:''
        }
    }
    componentDidUpdate(props){

        console.log('DID UPDATE CALLED',props);
    }
    render(){
        const {type} = this.props
        return(
            <>
            <Text>Class Component </Text>
            <Text>{type} </Text>
            <TextInput
            value={this.state.inoutValue}
            onChangeText={(text)=>{this.setState({inoutValue:text})}}
            placeholder="Add Something"
            />

            </>
        )
    }
}

export default ClassC;