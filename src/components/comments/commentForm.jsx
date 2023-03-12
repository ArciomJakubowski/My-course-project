import React, { useEffect, useState } from "react";
import API from "../../api";
import SelectField from "../common/form/selectField";
import UserTextField from "../common/form/userTextField";
import { validator } from "../../util/validator";
import PropTypes from "prop-types";

const CommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({ userId: "", content: "" });
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    // console.log("data", data);
    // console.log(users);
    // console.log(errors);

    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);

    const handleChange = (target) => {
        // setEmail(e.target.value);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));

        // console.log(e.target.value);
        console.log(target.value);
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Имя должно быть выбрано"
            }
        },

        content: {
            isRequired: {
                message: "Поле должно быть заполнено"
            }
        }
    };

    const usersSelectedField =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);

    const clearForm = () => {
        setData({ userId: "", content: "" });
        setErrors({});
    };

    const isValid = Object.keys(errors).length === 0;

    // console.log("usersSelectedField", usersSelectedField);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>New Comment</h1>
                <SelectField
                    // label="Пользователь"
                    name="userId"
                    defaultOption="Выберите пользователя"
                    options={usersSelectedField}
                    value={data.userId}
                    error={errors.userId}
                    onChange={handleChange}
                />

                <UserTextField
                    label="Сообщение"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <button className="btn btn-primary" disabled={!isValid}>
                    Опубликовать
                </button>
            </form>
        </>
    );
};

CommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default CommentForm;
