import React from "react";
// import API from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import CompletedMeetingsCard from "../../ui/completedMeetingsCard";
import Comments from "../../ui/comments";
// import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";
import { getUserById } from "../../../store/users";
import { useSelector } from "react-redux";

const UserPage = ({ id }) => {
    // const { getUserById } = useUser();
    // const user = getUserById(id);
    const user = useSelector(getUserById(id));
    console.log("Юзер", user);

    // const [page, setPage] = useState();

    // useEffect(() => {
    //     API.users.getById(userId).then((data) => setPage(data));
    // }, []);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard items={user} />
                        <QualitiesCard qualityItems={user.qualities} />
                        <CompletedMeetingsCard
                            meetingItems={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
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
