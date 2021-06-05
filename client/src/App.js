import React from "react";
import Main from "./components/main";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import MainPage from '../src/components/main_page';
import Login from '../src/components/login';
import Register from '../src/components/register';
import Auth from "./components/utils/auth";
import ErrorPage from "./components/error_page";

function App() {

  return (
    <>
      <Router>
        <Switch>
        
        <Route exact path="/">
            <MainPage/>
        </Route>

        <Route exact path="/login">
            <Login/>
        </Route>

        <Route exact path="/register">
            <Register/>
        </Route>

        <Private path="/my-unsplash" component={Main}/>
        
        <Route path="*">
          <ErrorPage/>
        </Route>
        </Switch>
      </Router>
      
    </>
  );
}

const Private = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    Auth.isAuthenticated ? <Component {...props}/> : <Redirect to="/login"/>
  )}/>

)

export default App;