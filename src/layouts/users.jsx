import UserPage from "../components/page/userPage";
import React from "react";
import UsersListPage from "../components/page/usersListPage";
import PropTypes from "prop-types";
import { useParams, Redirect } from "react-router-dom";
import UpDateUserPage from "../components/ui/updateUserPage";
// import UserProvider from "../hooks/useUsers";
// import { useAuth } from "../hooks/useAuth";
import { getCurrentUserId } from "../store/users";
import { useSelector } from "react-redux";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const params = useParams();
    // console.log("params", params);
    // const { currentUser } = useAuth();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());
    // console.log(userId);

    // const dataStatus = useSelector(getDataStatus());
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!dataStatus) dispatch(loadUsers());
    // });
    // if (!dataStatus) return "Loading";
    return (
        <>
            <UsersLoader>
                {/* <UserProvider> */}
                {userId ? (
                    edit ? (
                        // userId === currentUser._id ? (
                        userId === currentUserId ? (
                            <UpDateUserPage id={userId} />
                        ) : (
                            <Redirect
                                // to={`/users/${currentUser._id}/edit`}
                                to={`/users/${currentUserId}/edit`}
                            />
                        )
                    ) : (
                        <UserPage id={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
                {/* </UserProvider> */}
            </UsersLoader>
        </>
    );
};

Users.propTypes = {
    match: PropTypes.object.isRequired
};

export default Users;
