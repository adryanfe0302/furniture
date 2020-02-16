import React, {useEffect, useState} from 'react';
import Main from './main'
import 'antd/dist/antd.css';
import './App.css';
import { ContextProvider } from './stateContext'

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Main />
      </ContextProvider>
    </div>
  );
}

export default App;
