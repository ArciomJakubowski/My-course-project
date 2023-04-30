// import { getDataStatus, loadApp } from "../../../store/App";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfession } from "../../../store/profession";
import {
    getUsersLoadingStatus,
    loadUsers,
    getIsLoggedIn
} from "../../../store/users";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfession());
        if (isLoggedIn) {
            dispatch(loadUsers());
        }
    }, [isLoggedIn]);
    if (usersStatusLoading) return "Loading";
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
