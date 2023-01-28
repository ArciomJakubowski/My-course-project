import UserPage from "./userPage";
import React from "react";
import Users from "../layouts/users";
import PropTypes from "prop-types";

const UsersList = ({ match }) => {
    const userId = match.params.userId;
    // console.log(userId);
    return <>{userId ? <UserPage id={userId} /> : <Users />}</>;
};

UsersList.propTypes = {
    match: PropTypes.object.isRequired
};

export default UsersList;
