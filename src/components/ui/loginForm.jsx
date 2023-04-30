import React, { useState, useEffect } from "react";
import { validator } from "../../util/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
// import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";

const LoginForm = () => {
    // const [email, setEmail] = useState("");
    // console.log(process.env);

    const loginError = useSelector(getAuthErrors());
    const history = useHistory();

    // console.log(history.location.state.from.pathname);

    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    // const [enterError, setEnterError] = useState(null);

    // const { signIn } = useAuth();

    const dispatch = useDispatch();

    const handleChange = (target) => {
        // setEmail(e.target.value);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        // console.log(e.target.value);
        // console.log(target.value);
        // setEnterError(null);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
            // isEmail: {
            //     message: "Email введен некорректно"
            // }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
            // isCapitalSymbol: {
            //     message: "Пароль должен содержать хотя бы одну заглавную букву"
            // },
            // isContainDigit: {
            //     message: "Пароль должен содержать хотя бы одну цифру"
            // },
            // min: {
            //     message: "Пароль должен состоять минимум из 8 символов",
            //     value: 8
            // }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);

        // for (const fieldName in data) {
        //     if (data[fieldName].trim() === "") {
        //         errors[fieldName] = `${fieldName} обязательно для заполнения`;
        //     }
        // }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";

        dispatch(login({ payload: data, redirect }));
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const isValid = validate();
    //     if (!isValid) return;
    //     // if (Object.keys(errors).length !== 0) return;
    //     // console.log(data);

    //     try {
    //         await signIn(data);
    //         history.push(
    //             history.location.state
    //                 ? history.location.state.from.pathname
    //                 : "/"
    //         );
    //     } catch (error) {
    //         console.log(error.message);
    //         setEnterError(error.message);
    //         // setErrors(error);
    //         // console.log(error);
    //     }
    // };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            <CheckBoxField
                name="stayOn"
                value={data.stayOn}
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>

            {/* {enterError && <p className="text-danger">{enterError}</p>} */}
            {loginError && <p className="text-danger">{loginError}</p>}

            <button
                type="submit"
                // disabled={!isValid || enterError}
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
