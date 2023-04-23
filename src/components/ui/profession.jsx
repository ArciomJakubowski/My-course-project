import React, { useEffect } from "react";
// import { useProfessions } from "../../hooks/useProfession";
import PropTypes from "prop-types";
import {
    getProfessionById,
    getProfessionLoadingStatus,
    loadProfession
} from "../../store/profession";
import { useSelector, useDispatch } from "react-redux";

const Profession = ({ id }) => {
    // console.log("айди", id);
    const dispatch = useDispatch();
    // const { isLoading, getProfession } = useProfessions();
    const isLoading = useSelector(getProfessionLoadingStatus());
    const professionList = useSelector(getProfessionById(id));
    // const prof = getProfession(id);
    console.log("professionList", professionList);
    // console.log(prof.name);
    // console.log(prof);
    useEffect(() => {
        dispatch(loadProfession());
    }, []);

    if (!isLoading) {
        // return <p>{prof.name}</p>;
        return <p>{professionList?.name}</p>;
    } else return "Loading";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
