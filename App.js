/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Store, { Persistor } from './src/Store';
import AppRouter, { StackNavigation } from './src/components/navigation/navigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={Store}>
          <PersistGate loading={null} persistor={Persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
    );
  }
}
