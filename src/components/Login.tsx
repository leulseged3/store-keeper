import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, TextStyle, TextInput } from 'react-native';
import { Navigation, NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { useActions, useProps } from '../hooks';
import { AppButton } from '../components';
import { SceneNames } from '../utilities/screenNames';
import SplashScreen from "react-native-lottie-splash-screen";
import { Formik } from 'formik';
import * as yup from 'yup'
import { login } from '../api/login';

interface IProps extends NavigationComponentProps {

}

export const LoginComponent: NavigationFunctionComponent<IProps> = (props) => {
  const { componentId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { Auth } = useProps(state => state);
  const actions = useActions();

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 3000)
  }, []);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at lease ${min} characters`)
      .required('Password is required')
  });

  const handleLogin = (values: { email: string, password: string }) => {
    console.log('val')
    setIsLoading(true)
    login(values.email, values.password)
      .then(res => actions.Auth.setAuth({ ...res, token: res.access_token }))
      // .then(() => Navigation.setStackRoot(componentId, {
      //   component: {
      //     name: SceneNames.ScreenFive
      //   }
      // }))
      .catch(err => {
        setIsLoading(false);
        setLoginError(true)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.signInText}>
        Login To Manage The Store
      </Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => handleLogin(values)}
      >{({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        touched
      }) => (
        <>
          <View style={styles.InputWrapper}>
            <TextInput
              placeholder='Email Address'
              style={styles.textInputStyle}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType='email-address'
            />
            {(errors.email && touched.email) &&
              <Text style={styles.errorTextStyle}>{errors.email}</Text>
            }
          </View>

          <View style={styles.InputWrapper}>
            <TextInput
              placeholder='*******'
              style={styles.textInputStyle}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {(errors.password && touched.email) &&
              <Text style={styles.errorTextStyle}>{errors.password}</Text>
            }
          </View>

          <AppButton
            title='Login'
            buttonContainerStyle={styles.buttonContainerStyle}
            onPress={handleSubmit}
            isDisabled={!isValid}
            isLoading={isLoading}
          />
        </>
      )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 25
  } as ViewStyle,
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  } as TextStyle,
  languageName: {
    fontWeight: 'bold'
  } as TextStyle,
  changeLanguageButton: {
    backgroundColor: 'blue',
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,
  changeLanguageButtontext: {
    color: '#fff',
    fontWeight: 'bold'
  } as TextStyle,
  InputWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 10,
    borderRadius: 5
  } as ViewStyle,
  textInputStyle: {
    paddingHorizontal: 15
  } as TextStyle,
  buttonContainerStyle: {
    paddingVertical: 10,
    width: '50%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    borderRadius: 5
  } as ViewStyle,
  signInText: {
    fontSize: 20,
    marginBottom: 15
  } as TextStyle,
  errorTextStyle: {
    fontSize: 10,
    color: 'red',
    paddingLeft: 10,
    paddingBottom: 5
  } as TextStyle
});
