import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import TokenScreen from '../screens/TokenScreen';
import MainScreen from '../screens/MainScreen';

import './App.css';
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <TokenScreen/>
          </Route>
          <Route path="/home">
            <MainScreen/>
          </Route>
        </Switch>
      </Router>  
    </div>
  );
}

export default App;
