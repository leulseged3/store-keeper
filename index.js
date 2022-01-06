import React from 'react';
import { Navigation } from 'react-native-navigation';
import {
  MainScreen
} from './src/screens';
import { Provider } from 'react-redux';
import { SceneNames } from './src/utilities/screenNames';
import { store } from './src/states/store';

Navigation.registerComponent(
  SceneNames.MainScreen,
  () => props =>
  (
    <Provider store={store}>
      <MainScreen {...props} />
    </Provider>
  ),
  () => MainScreen,
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SceneNames.MainScreen
            }
          }
        ]
      },
    },
  });
});

Navigation.setDefaultOptions({
  topBar: {
    background: {
      color: '#F5F5F5'
    }
  },
  statusBar: {
    backgroundColor: '#F5F5F5'
  }
})