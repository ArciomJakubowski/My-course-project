import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import API from "../../api";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
import { validator } from "../../util/validator";
import { useHistory } from "react-router-dom";

const UpDateUserPage = ({ id }) => {
    const history = useHistory();
    console.log("history", history);

    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    // console.log("data", data);
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    // console.log({ professions });

    useEffect(() => {
        API.users.getById(id).then((user) => {
            setData((prev) => ({
                ...prev,
                ...user,
                qualities: user.qualities.map((qual) => ({
                    label: qual.name,
                    value: qual._id,
                    color: qual.color
                })),
                profession: user.profession._id
            }));
        });

        API.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            console.log({ professionsList });
            setProfessions(professionsList);
        });

        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            console.log({ qualitiesList });
            setQualities(qualitiesList);
        });
    }, []);

    if (professions) {
        const handleChange = (target) => {
            console.log(target.value);
            // setEmail(e.target.value);
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));

            // console.log(e.target.value);
        };

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

        const validatorConfig = {
            email: {
                isRequired: {
                    message: "Электронная почта обязательна для заполнения"
                },
                isEmail: {
                    message: "Email введен некорректно"
                }
            },
            name: {
                isRequired: {
                    message: "Введите ваше имя"
                }
            }
        };

        useEffect(() => {
            validate();
        }, [data]);

        const validate = () => {
            const errors = validator(data, validatorConfig);

            setErrors(errors);

            return Object.keys(errors).length === 0;
        };

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

            API.users
                .update(id, {
                    ...data,
                    profession: getProfessionById(profession),
                    qualities: getQualities(qualities)
                })
                .then((data) => {
                    history.push(`/users/${data._id}`);
                });
        };
        if (data._id && professions && qualities) {
            return (
                <>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 shadow p-4">
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="Имя"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                    />

                                    <TextField
                                        label="Электронная почта"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />

                                    <SelectField
                                        label="Выбери свою профессию"
                                        name="profession"
                                        defaultOption="Choose..."
                                        options={professions}
                                        value={data.profession}
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

                                    <button
                                        className="btn btn-primary w-100 mx-auto"
                                        type="submit"
                                    >
                                        Обновить
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return <h1>Loading...</h1>;
        }
    }
};

UpDateUserPage.propTypes = {
    professions: PropTypes.object,
    qualitiesUp: PropTypes.array,
    nameUp: PropTypes.string,
    id: PropTypes.string
};

export default UpDateUserPage;
