import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/login";
import UsersList from "./components/usersList";

function App() {
    // console.log("userId", userId);
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UsersList} />
            </Switch>
        </div>
    );
}

export default App;

// (user.bookmark = !user.bookmark)
