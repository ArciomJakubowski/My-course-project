import UserPage from "../components/page/userPage";
import React from "react";
import UsersListPage from "../components/page/usersListPage";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import UpDateUserPage from "../components/ui/updateUserPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    // console.log("params", params);

    const { userId, edit } = params;
    // console.log(userId);

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <UpDateUserPage id={userId} />
                    ) : (
                        <UserPage id={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

Users.propTypes = {
    match: PropTypes.object.isRequired
};

export default Users;
