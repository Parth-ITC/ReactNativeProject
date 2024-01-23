import React from "react";
import { Text } from "react-native";

class ClassC extends React.Component {
    render(){
        const {type} = this.props
        return(
            <>
            <Text>Class Component </Text>
            <Text>{type} </Text>

            </>
        )
    }
}

export default ClassC;