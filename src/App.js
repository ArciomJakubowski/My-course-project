import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/login";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" component={Users} />
            </Switch>
        </div>
    );
}

export default App;
