import React, { useState, useEffect } from "react";
import API from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import CompletedMeetingsCard from "../../ui/completedMeetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ id }) => {
    // console.log("id", typeof id);
    // console.log("id", id);
    const userId = id.toString();
    // console.log("useId", typeof userId);
    // console.log("useId", userId);

    const [page, setPage] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setPage(data));
    }, []);

    if (page) {
        // console.log("page", page);

        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard items={page} />
                        <QualitiesCard qualityItems={page.qualities} />
                        <CompletedMeetingsCard
                            meetingItems={page.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

export default UserPage;

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
