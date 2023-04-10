import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
// import API from "../../api";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
import { validator } from "../../util/validator";
import { useHistory } from "react-router-dom";
import { useProfessions } from "../../hooks/useProfession";
import { useQualities } from "../../hooks/useQuality";
import { useUser } from "../../hooks/useUsers";

const UpDateUserPage = ({ id }) => {
    const history = useHistory();

    console.log("userId", id);

    const { users, getUserById } = useUser();
    console.log("users", users);

    const oldUser = getUserById(id);
    console.log("oldUser", oldUser);

    const { professions, getProfession } = useProfessions();
    console.log("professions", professions);

    const oldUserProfession = getProfession(oldUser.profession);
    console.log("oldUserProfession", oldUserProfession);

    const professionsList = professions.map((professionName) => ({
        value: professionName._id,
        label: professionName.name
    }));

    const { qualities, getQuality } = useQualities();

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    console.log("oldUser.qualities", oldUser.qualities);
    console.log("qualities", qualities);
    const userQual = oldUser.qualities.map((q) => getQuality(q));
    // const userQual = getQuality(oldUser.qualities);
    // const qU = userQual.label;
    // console.log("qU", qU);
    console.log("userQual", userQual);
    const uQV = userQual.map((uq) => ({
        value: uq._id,
        label: uq.name,
        color: uq.color
    }));

    console.log("uQV", uQV);

    // const [professions, setProfessions] = useState([]);
    // const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     API.users.getById(id).then((user) => {
    //         setData((prev) => ({
    //             ...prev,
    //             ...user,
    //             qualities: user.qualities.map((qual) => ({
    //                 label: qual.name,
    //                 value: qual._id,
    //                 color: qual.color
    //             })),
    //             profession: user.profession._id
    //         }));
    //     });

    // API.professions.fetchAll().then((data) => {
    //     const professionsList = Object.keys(data).map((professionName) => ({
    //         label: data[professionName].name,
    //         value: data[professionName]._id
    //     }));
    //     console.log({ professionsList });
    //     setProfessions(professionsList);
    // });

    //     API.qualities.fetchAll().then((data) => {
    //         const qualitiesList = Object.keys(data).map((optionName) => ({
    //             label: data[optionName].name,
    //             value: data[optionName]._id,
    //             color: data[optionName].color
    //         }));
    //         console.log({ qualitiesList });
    //         setQualities(qualitiesList);
    //     });
    // }, []);

    const handleChange = (target) => {
        console.log(target.value);
        // setEmail(e.target.value);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));

        // console.log(e.target.value);
    };

    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         console.log("prof", prof);
    //         if (prof._id === id) {
    //             return { value: prof._id, label: prof.name };
    //         }
    //     }
    // };

    const getQualities = (elements) => {
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    return {
                        label: qualities[quality].name,
                        value: qualities[quality]._id,
                        color: qualities[quality].color
                    };
                }
            }
        }
    };

    const userQuality = getQualities(qualities);
    console.log("qualityUser", userQuality);

    const [data, setData] = useState({
        name: oldUser.name,
        email: oldUser.email,
        profession: oldUserProfession._id,
        sex: "male",
        qualities: uQV
    });

    console.log("data", data);

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
        const { qualities, profession } = data;

        // setData({
        //     ...data,
        //     profession: getProfessionById(upUser.profession),
        //     qualities: getQualities(userQuality)
        // });
        const newData = {
            ...data,
            profession: profession.value,
            // profession: getProfessionById(profession).value,
            // qualities: getQualities(qualities)
            qualities: qualities.map((q) => q.value)
        };

        console.log("newData", newData);
        setData(newData);

        //     API.users
        //         .update(id, {
        //             ...data,
        //             profession: getProfessionById(profession),
        //             qualities: getQualities(upUser.qualities)
        //         })
        //         .then((data) => {
        //             history.push(`/users/${data._id}`);
        //         });

        handleOpenUserPage();
    };

    const handleOpenUserPage = () => {
        history.push(`/users/${users._id}`);
    };
    // const handleOpenUserPage = () => {
    //     history.push(`/users/${data._id}`);
    // };

    if (id && oldUserProfession && userQual) {
        return (
            <>
                <div className="container mt-5">
                    <button
                        className="btn btn-primary mt-5 ms-5"
                        onClick={handleOpenUserPage}
                    >
                        <i className="bi bi-caret-left"></i>Назад
                    </button>
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
                                    options={professionsList}
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
                                    options={qualitiesList}
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
};

UpDateUserPage.propTypes = {
    professions: PropTypes.object,
    qualitiesUp: PropTypes.array,
    nameUp: PropTypes.string,
    id: PropTypes.string
};

export default UpDateUserPage;
