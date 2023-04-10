import React from "react";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <ProfessionProvider>
                    <QualityProvider>
                        <Switch>
                            <Route path="/" exact component={Main} />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/login/:type?" component={Login} />
                            <ProtectedRoute
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            {/* <Route
                                path="/users/:userId?/:edit?"
                                component={Users}
                            /> */}
                            <Redirect to="/" />
                        </Switch>
                    </QualityProvider>
                </ProfessionProvider>
            </AuthProvider>

            <ToastContainer />
        </div>
    );
}

export default App;
