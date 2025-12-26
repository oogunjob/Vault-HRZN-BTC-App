import './gesture-handler';
import 'react-native-get-random-values';
import './shim.js';

import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { registerRootComponent } from 'expo';

import App from './App';
import { restoreSavedPreferredFiatCurrencyAndExchangeFromStorage } from './blue_modules/currency';

if (!Error.captureStackTrace) {
  // captureStackTrace is only available when debugging
  Error.captureStackTrace = () => {};
}

LogBox.ignoreLogs([
  'Require cycle:',
  'Battery state `unknown` and monitoring disabled, this is normal for simulators and tvOS.',
  'Open debugger to view warnings.',
  'Non-serializable values were found in the navigation state',
]);

const BlueAppComponent = () => {
  useEffect(() => {
    restoreSavedPreferredFiatCurrencyAndExchangeFromStorage();
  }, []);

  return <App />;
};

// Use Expo's registerRootComponent instead of AppRegistry.registerComponent
registerRootComponent(BlueAppComponent);