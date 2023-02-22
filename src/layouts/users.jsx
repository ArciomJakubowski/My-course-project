import UserPage from "../components/page/userPage";
import React from "react";
import UsersListPage from "../components/page/usersListPage";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Users = () => {
    const params = useParams();
    console.log("params", params);

    const { userId } = params;

    return <>{userId ? <UserPage id={userId} /> : <UsersListPage />}</>;
};

Users.propTypes = {
    match: PropTypes.object.isRequired
};

export default Users;
