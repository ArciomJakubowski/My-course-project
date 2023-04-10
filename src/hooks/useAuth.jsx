import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import userService from "../services/user.services";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const history = useHistory();

    async function signUp({ email, password, ...rest }) {
        // const keyFireBasePrivate = "AIzaSyDAgRfJBcDtLsuucmGheK6HoCcodfGJSh4";
        // const url = `accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(
                `accounts:signUp`,
                // `accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                completedMeetings: randomInt(0, 200),
                ...rest
            });
            console.log(data);
        } catch (error) {
            errorCatcher(error);

            console.log("21312312", error);
            const { code, message } = error.response.data.error;
            console.log(code, message);

            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }

            // throw new Error();
        }
    }

    async function signIn({ email, password, ...rest }) {
        // const keyFireBasePrivate = "AIzaSyDAgRfJBcDtLsuucmGheK6HoCcodfGJSh4";
        // const url = `accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                // `accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            console.log(data);

            await getUserData();
        } catch (error) {
            errorCatcher(error);

            console.log("21312312", error);

            const { code, message } = error.response.data.error;

            console.log(code, message);

            if (code === 400) {
                // if (message === "EMAIL_NOT_FOUND") {
                //     const errorObject = {
                //         email: "Пользователь с таким Email не существует"
                //     };
                //     throw errorObject;
                // }
                // if (message === "INVALID_PASSWORD") {
                //     const errorObject = {
                //         password: "Неверный пароль пользователя"
                //     };
                //     throw errorObject;
                // }
                // if (message === "EMAIL_NOT_FOUND") {
                //     throw new Error("Пользователь с таким Email не существует");
                // }

                // if (message === "INVALID_PASSWORD") {
                //     throw new Error("Email  или пароль введены неверно");
                // }

                // if (message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
                //     throw new Error(
                //         "Слишком много попыток входа. Попробуйте повторить позже"
                //     );
                // }

                switch (message) {
                    case "EMAIL_NOT_FOUND":
                        throw new Error(
                            "Пользователь с таким Email не существует"
                        );

                    case "INVALID_PASSWORD":
                        throw new Error(
                            "Пользователь с таким Email не существует"
                        );

                    default:
                        throw new Error(
                            "Слишком много попыток входа. Попробуйте повторить позже."
                        );
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            console.log(content);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        // setLoading(false);
    }
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser, logOut }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
