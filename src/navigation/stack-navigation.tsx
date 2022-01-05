import React from 'react';
import {
  ScreenOne,
  ScreenTwo,
  LoginScreen
} from '../screens';
import { Provider } from 'react-redux';
import { Navigation, LayoutStack } from 'react-native-navigation';
import { SceneNames } from '../utilities/screenNames';
import { store } from '../states/store';

Navigation.registerComponent(
  SceneNames.LoginScreen,
  () => props =>
  (
    <Provider store={store}>
      <LoginScreen {...props} />
    </Provider>
  ),
  () => LoginScreen,
);

Navigation.registerComponent(
  SceneNames.ScreenOne,
  () => props =>
  (
    <Provider store={store}>
      <ScreenOne {...props} />
    </Provider>
  ),
  () => ScreenOne,
);


Navigation.registerComponent(
  SceneNames.ScreenTwo,
  () => props =>
  (
    <Provider store={store}>
      <ScreenOne {...props} />
    </Provider>
  ),
  () => ScreenTwo,
);

export const stackNavigation: LayoutStack = {
  children: [
    {
      component: {
        name: SceneNames.LoginScreen
      }
    },
    {
      component: {
        name: SceneNames.ScreenOne
      }
    },
    {
      component: {
        name: SceneNames.ScreenTwo
      }
    }
  ]
}