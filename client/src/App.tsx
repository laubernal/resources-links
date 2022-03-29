import React from 'react';
import * as ReactDom from 'react-dom';
import './App.css';

export const App = () => {
  return <h1>Hi there!</h1>;
};

ReactDom.render(<App />, document.querySelector('#root'));
