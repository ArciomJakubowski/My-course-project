import React, { useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../store/users";

const LogOut = () => {
    // const { logOut } = useAuth();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        // logOut();
    }, []);

    return <h1>Loading...</h1>;
};

export default LogOut;
