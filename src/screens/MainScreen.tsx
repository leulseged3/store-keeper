import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { useActions, useProps } from '../hooks';
import SplashScreen from "react-native-lottie-splash-screen";
import { AddRecord, LoginComponent } from '../components';

interface IProps extends NavigationComponentProps {

}

export const MainScreen: NavigationFunctionComponent<IProps> = (props) => {
  const { componentId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { Auth } = useProps(state => state);
  const actions = useActions();

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 3000)
  }, []);

  return (
    <>
      {
        Auth.token ?
          <AddRecord componentId={componentId} />
          :
          <LoginComponent componentId={componentId} />
      }
    </>
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
});
