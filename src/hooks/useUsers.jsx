import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.services";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { currentUser } = useAuth();

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    useEffect(() => {
        if (!isLoading) {
            const newArray = [...users];
            const indexUser = newArray.findIndex(
                (u) => u._id === currentUser._id
            );
            console.log(indexUser);
            newArray[indexUser] = currentUser;
            setUsers(newArray);
        }
    }, [currentUser]);

    function getUserById(userId) {
        return users.find((u) => u._id === userId);
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        // setLoading(false);
    }
    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : "Loading..."}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
