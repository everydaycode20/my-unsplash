import React, {useContext} from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import {LoginContext} from "./utils/context";

function Private({component: Component, ...rest}) {

    const {auth} = useContext(LoginContext);
    console.log(auth, "comp");

    return (
        <Route {...rest} render={(props) => {
        
        return auth === true ? <Component {...props}/> : <Redirect to="/login"/>
        }} />
    )
        
}

export default Private;