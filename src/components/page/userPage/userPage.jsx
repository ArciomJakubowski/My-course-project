import React, { useState, useEffect } from "react";
import API from "../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities/";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    // console.log("id", typeof id);
    // console.log("id", id);
    const userId = id.toString();
    // console.log("useId", typeof userId);

    const history = useHistory();

    const [page, setPage] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setPage(data));
    }, []);

    if (page) {
        console.log("page", page);

        const {
            name,
            profession,
            completedMeetings,
            rate,
            qualities,
            email,
            sex
        } = page;
        // console.log("profession", profession);
        console.log("qualities", qualities);
        // console.log("name", name);

        const handleOpenFormUser = () => {
            history.push(`/users/${id}/edit`);
        };

        return (
            <>
                <div className="container mt-2  pt-3">
                    <h1 className=" d-inline-flex p-2 text-danger">{name}</h1>
                    <h4 className="text-success">
                        Профессия: {profession.name}
                    </h4>
                    <h4 className="text-warning">Пол: {sex}</h4>
                    <h6>Электронная почта: {email}</h6>
                    <h4>
                        <Qualities qualities={qualities} />
                    </h4>
                    <h6> CompletedMeetings: {completedMeetings}</h6>
                    <h2>Rate: {rate}</h2>
                    <button
                        className="btn btn-primary mt-5"
                        onClick={() => handleOpenFormUser()}
                    >
                        Изменить
                    </button>
                </div>
            </>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default UserPage;

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
