import React, { useState, useEffect } from "react";
import API from "../../api";
import { validator } from "../../util/validator";
import CheckBoxField from "../common/form/checkBoxField";
import MultiSelectField from "../common/form/multiSelectField";
import RadioField from "../common/form/radioField";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";

const RegisterForm = () => {
    // const [email, setEmail] = useState("");

    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });

    // const [qualities, setQualities] = useState({});
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    // useEffect(() => {
    //     API.professions.fetchAll().then((data) => setProfession(data));
    //     API.qualities.fetchAll().then((data) => setQualities(data));
    // }, []);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

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
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения "
            }
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
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const isValid = validate();
    //     if (!isValid) return;
    //     // if (Object.keys(errors).length !== 0) return;
    //     console.log(data);
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
            <SelectField
                label="Выбери свою профессию"
                name="profession"
                defaultOption="Choose..."
                options={professions}
                value={data.profession}
                error={errors.profession}
                onChange={handleChange}
            />

            <RadioField
                name="sex"
                value={data.sex}
                label="Выберите ваш пол"
                onChange={handleChange}
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
            />
            <MultiSelectField
                onChange={handleChange}
                options={qualities}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
            />

            <CheckBoxField
                name="licence"
                value={data.licence}
                onChange={handleChange}
                error={errors.licence}
            >
                Подтвердить <a>лицензионое соглашение</a>
            </CheckBoxField>

            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
