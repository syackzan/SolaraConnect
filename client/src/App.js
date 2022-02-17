import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';

import Phantom from './components/pages/Phantom';

const App = () => {

  return (
    <div>
      <Router>
          <Phantom />
      </Router>
    </div>
  )
}

export default App

