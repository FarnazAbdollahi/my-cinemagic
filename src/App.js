import './App.css';
import SideNav from '../src/Components/SideNav/SideNav'
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import HomePage from '../src/Container/HomePage/HomePage'
import WatchList from '../src/Container/WatchList/WatchList'
import Signin from '../src/Container/SigninPage/SigninPage'
import Signup from '../src/Container/SignupPage/SignupPage'

const App = () => {
  return (
    <Router>
      <SideNav />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signin-page" exact component={Signin} />
        <Route path="/signup-page" exact component={Signup} />
        <Route path="/watched-page" component={WatchList} />
      </Switch>

    </Router>
  );
}

export default App;
