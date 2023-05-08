import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
// import API from "../../api";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
import { validator } from "../../util/validator";
import { useHistory } from "react-router-dom";
// import { useProfessions } from "../../hooks/useProfession";
// import { useQualities } from "../../hooks/useQuality";
// import { useAuth } from "../../hooks/useAuth";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfession,
    getProfessionLoadingStatus
} from "../../store/profession";
import { getCurrentUserData, updateData } from "../../store/users";

const UpDateUserPage = () => {
    const history = useHistory();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    // const { updateDate, currentUser } = useAuth();
    // const { updateDate } = useAuth();
    const currentUser = useSelector(getCurrentUserData());
    const professions = useSelector(getProfession());
    const isLoadingProfessions = useSelector(getProfessionLoadingStatus());
    const qualities = useSelector(getQualities());
    const isLoadingQualities = useSelector(getQualitiesLoadingStatus());
    // const { professions, isLoading: isLoadingProfessions } = useProfessions();

    const professionsList = professions.map((professionName) => ({
        value: professionName._id,
        label: professionName.name
    }));

    // const { qualities, isLoading: isLoadingQualities } = useQualities();

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const handleChange = (target) => {
        // setEmail(e.target.value);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    // const [professions, setProfessions] = useState([]);
    // const [qualities, setQualities] = useState([]);

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

    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         console.log("prof", prof);
    //         if (prof._id === id) {
    //             return { value: prof._id, label: prof.name };
    //         }
    //     }
    // };

    // const getQualities = (elements) => {
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             if (elem.value === qualities[quality].value) {
    //                 return {
    //                     label: qualities[quality].name,
    //                     value: qualities[quality]._id,
    //                     color: qualities[quality].color
    //                 };
    //             }
    //         }
    //     }
    // };

    const getQualitiesById = (qualitiesIds) => {
        const newQualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    newQualitiesArray.push(quality);
                    break;
                }
            }
        }
        return newQualitiesArray;
    };

    useEffect(() => {
        if (!isLoadingProfessions && !isLoadingQualities && currentUser) {
            setData(() => ({
                ...currentUser,
                qualities: getQualitiesById(currentUser.qualities).map(
                    (qual) => ({
                        value: qual._id,
                        label: qual.name
                    })
                )
            }));
        }
    }, [isLoadingProfessions, isLoadingQualities, currentUser]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

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
        dispatch(
            updateData({
                ...data,
                qualities: data.qualities.map((qual) => qual.value)
            })
        );

        handleOpenUserPage();

        //     API.users
        //         .update(id, {
        //             ...data,
        //             profession: getProfessionById(profession),
        //             qualities: getQualities(upUser.qualities)
        //         })
        //         .then((data) => {
        //             history.push(`/users/${data._id}`);
        //         });
    };

    const handleOpenUserPage = () => {
        history.push(`/users/${currentUser._id}`);
    };

    if (!isLoading && qualities) {
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
