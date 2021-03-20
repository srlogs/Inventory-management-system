import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './modules/Landingpage/LandingPage.js';
import Home from './modules/HomePage.js';
import Signin from './modules/SigninPage.js';
import Signup from './modules/SignupPage.js';
import Actions from './modules/ActionPage';

function App() {
  return (
    <main>
      <Router>
      <Route exact path="/" component={Landing} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Home} />
      <Route path="/home/actions" component={Actions} />
      </Router>
    </main>
  );
}

export default App;
