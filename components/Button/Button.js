import React from 'react';
import { View, Text, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './Button.styles';


const Buton = ({ text, loading, onPress, theme="primary" }) => {
    return (
        <TouchableOpacity style={styles[theme].container}
            onPress={onPress}
            disabled={loading}>
            { loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <View style={styles[theme].buton_container}>
                   
                    <Text style={styles[theme].text}>{text}</Text>
                </View>

            )}
        </TouchableOpacity>
    )
}

export default Buton;