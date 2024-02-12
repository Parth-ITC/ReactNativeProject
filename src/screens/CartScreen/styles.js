import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    bottomView:{
        paddingVertical:15,
        marginHorizontal:10,
        borderRadius:10,
        backgroundColor:COLORS.headerColor,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10,
        paddingHorizontal:10,
        justifyContent:'space-between'
    }
})