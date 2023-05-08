import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
// import { useQualities } from "../../../hooks/useQuality";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";
import { useSelector, useDispatch } from "react-redux";

const QualitiesList = ({ qualities }) => {
    // const { isLoading } = useQualities();
    const dispatch = useDispatch();

    // console.log(qualities);

    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) return "Loading";

    return (
        <>
            {qualitiesList.map((qual) => (
                <Quality {...qual} _id={qual} key={qual._id} {...qual} />
            ))}
            {/* {qualities.map((qual) => (
                <Quality {...qual} _id={qual} key={qual} />
            ))} */}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array,
    id: PropTypes.array
};
export default QualitiesList;
