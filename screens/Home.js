import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Pressable, AsyncStorage } from 'react-native'
import React, { useEffect, useState } from 'react'
import ClockComponent from '../components/ClockComponent'
import auth from '@react-native-firebase/auth';
import Buton from '../components/Button';

const Home = ({ navigation }) => {
  const [userSession, setUserSession] = useState(null)
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
      //AsyncStorage.setItem("userSession",true)
    });
    //console.log( "UserSession storage:",AsyncStorage.getItem("userSession"))
     //setUserSession(AsyncStorage.getItem("userSession"))
  }, [userSession])
  
 

  
  return (
    <SafeAreaView style={{ flex: 3 }}>
      <ImageBackground style={{ flex: 1 }} source={require("../assets/images/pexels-photo-7409235.jpg")} resizeMode="cover" >
        <View style={styles.image}>
          <Text  style={styles.text}>Your Things</Text>
          <ClockComponent></ClockComponent>
        </View>
        { userSession ? (null) : (<View style={{ flex: 1.8, alignContent: "center", justifyContent: "center" }}>
          <Buton text="Giriş Yap" theme="primary" onPress={() => navigation.navigate('LoginPage')}></Buton>
          <Buton text="Kayıt ol" theme="primary" onPress={() => navigation.navigate('SignUpPage')}></Buton>
        </View>) }
        

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
    flexDirection: 'row',
    padding: 10
  },
  text: {
    flex: 1,
    color: "white",
    fontSize: 32,
    lineHeight: 42,
    fontWeight: "bold",
    marginRight: 25,
    padding: 10,
    marginTop: 35,

  }
});