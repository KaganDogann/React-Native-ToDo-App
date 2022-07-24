import { View, Text, SafeAreaView, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import ClockComponent from '../components/ClockComponent'


const Home = () => {

    const image = { uri: "https://p4.wallpaperbetter.com/wallpaper/795/744/966/mountains-twilight-foggy-forest-wallpaper-preview.jpg"}
  return (
    <SafeAreaView style={{flex:1}}>
        <ImageBackground style={styles.image} source={image} resizeMode="cover" >
            <Text style={styles.text}>Your Things</Text>
            <ClockComponent></ClockComponent>
        </ImageBackground>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      flexDirection:'row',
      padding:10
    },
    text: {
      flex:1,
      color: "white",
      fontSize: 32,
      lineHeight: 42,
      fontWeight: "bold",
      marginRight:25,
      padding:10,
      marginTop:35,

    }
  });