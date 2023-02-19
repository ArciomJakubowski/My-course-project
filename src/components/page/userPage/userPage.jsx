import React, { useState, useEffect } from "react";
import API from "../../../api";
import { useHistory } from "react-router-dom";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";

const UserPage = ({ id }) => {
    console.log("id", typeof id);
    const userId = id.toString();
    console.log("useId", typeof userId);

    const history = useHistory();

    const [page, setPage] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setPage(data));
    }, []);

    if (page) {
        // console.log("page", page);

        const { name, profession, completedMeetings, rate, qualities } = page;
        // console.log("profession", profession);
        // console.log("qualities", qualities);

        const handleSaveAllUsers = () => {
            history.push("/users");
        };
        return (
            <>
                <h1>{name}</h1>
                <h4>Профессия: {profession.name}</h4>
                <h4>
                    <Qualities qualities={qualities} />
                </h4>
                <h6> CompletedMeetings: {completedMeetings}</h6>
                <h2>Rate: {rate}</h2>
                <button
                    onClick={() => {
                        handleSaveAllUsers();
                    }}
                >
                    Изменить
                </button>
            </>
        );
    }
    return <h1>Loading</h1>;
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
