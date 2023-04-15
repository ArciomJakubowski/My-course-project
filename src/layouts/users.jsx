import UserPage from "../components/page/userPage";
import React from "react";
import UsersListPage from "../components/page/usersListPage";
import PropTypes from "prop-types";
import { useParams, Redirect } from "react-router-dom";
import UpDateUserPage from "../components/ui/updateUserPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const params = useParams();
    // console.log("params", params);
    const { currentUser } = useAuth();
    const { userId, edit } = params;
    // console.log(userId);

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        userId === currentUser._id ? (
                            <UpDateUserPage id={userId} />
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`} />
                        )
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
