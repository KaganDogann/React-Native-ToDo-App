import { StyleSheet } from "react-native";
import colors from "../../styles/color";

const baseStyle = StyleSheet.create({
        container: {
            opacity:0.9,
            
            borderWidth:1,
            margin: 5,
            borderRadius: 10,
            alignItems: 'center',
        },
        text: {
            fontWeight: 'bold',
            color: 'black',
            fontSize: 18,
            marginTop:6
        },
        buton_container: {
            alignItems: 'center',
            height: 40
        }
});

export default {

    
    primary: StyleSheet.create({
        ...baseStyle,
    }),


    secondary: StyleSheet.create({
        ...baseStyle,
        container: {
            ...baseStyle.container,
            backgroundColor: "black",
            borderColor: "black",
            borderWidth: 2,
            
        },
        text: {
            ...baseStyle.text,
            color: "white",
        },
    })
}