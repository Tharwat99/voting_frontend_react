import React from 'react';
import {HashRouter, Route , Routes} from "react-router-dom";

import './App.css';
import Poll from './Components/Poll/Poll';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Poll/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;