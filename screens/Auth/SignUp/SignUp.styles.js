import { StyleSheet } from "react-native";
import colors from "../../../styles/color";

export default StyleSheet.create({
    container: {
        justifyContent:'center',
        alignContent:'center',
        
        backgroundColor: '#64b5e0',//#64b5f6
        flex: 1,
       
        
    },
    body_container: {
        flex: 1
    },
    header: {
        fontSize: 135,
        color: colors.blue,
        fontWeight: 'bold'
    }
})