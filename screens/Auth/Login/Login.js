import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import Buton from '../../../components/Button';
import Input from '../../../components/Input';
import styles from './Login.Styles';
import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';

const initialForm = {
  usermail: '',
  password: '',
};

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  function handleSignUp() {
    navigation.navigate('SignUpPage');
  }

  async function handleFormSubmit(formValues) {
    try {
      if (formValues.usermail.length < 3) {
        console.log("HATA")
      } else {
        setLoading(true);
        await auth().signInWithEmailAndPassword(
          formValues.usermail,
          formValues.password,
        );
        showMessage({
          message: 'Giriş başarılı',
          type: 'success',
        });
        navigation.navigate('HomePage')
      }
      //console.log(formValues);
      
    } catch (error) {
      //console.log("alsdkalsdkşa");
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'warn',
      });

      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik initialValues={initialForm} onSubmit={handleFormSubmit}>
        {({ handleChange, values, handleSubmit }) => (
          <>
            <Input
              placeholder="Mail giriniz"
              onChangeText={handleChange('usermail')}
              value={values.usermail}
            />
            <Input
              placeholder="Şifre giriniz"
              value={values.password}
              isSecure
              onChangeText={handleChange('password')}
            />
            <Buton text="Giriş Yap" theme="primary" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Buton text="Kayıt ol" theme="secondary" onPress={handleSignUp} />
      {/* <Buton style = {{marginTop:25}}text="Geri" theme="secondary" onPress={() =>navigation.goBack() }></Buton> */}
    </SafeAreaView>
  );
};

export default Login;
