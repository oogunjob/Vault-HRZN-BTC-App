import './gesture-handler';
import 'react-native-get-random-values';
import './shim.js';

import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { registerRootComponent } from 'expo';

import App from './App';
import { restoreSavedPreferredFiatCurrencyAndExchangeFromStorage } from './blue_modules/currency';

// Enable better error display
if (__DEV__) {
  import('react-native').then(({ LogBox }) => {
    LogBox.ignoreAllLogs(false);
  });
}

if (!Error.captureStackTrace) {
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

registerRootComponent(BlueAppComponent);