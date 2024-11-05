import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Summary from './component/Summary';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



function App() {
    return <Router>
      <Routes>
        <Route path='/summary/:first/:last' element={<Summary></Summary>}></Route>
      </Routes>
    </Router>
}

export default App;
