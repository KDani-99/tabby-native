/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import Main from './resources/components/Main/Main';
import { AppRegistry } from 'react-native';

const App: () => React$Node = () => {
  //console.disableYellowBox = true;
  return (
    <>
      <Main />
    </>
  );
};

AppRegistry.registerComponent('tabby',()=>App);

export default App;