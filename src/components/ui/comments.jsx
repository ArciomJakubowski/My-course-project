import React, { useEffect, useState } from "react";
import CommentForm from "../comments/commentForm";
import { useParams } from "react-router-dom";
import API from "../../api";
import CommentsList from "../comments/commentsList";
import PropTypes from "prop-types";
import _ from "lodash";

const Comments = () => {
    const { userId } = useParams();
    // console.log("params", params);
    // console.log(typeof userId);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    // console.log("comments", comments);

    const handleAddComment = (data) => {
        // console.log(API.comments.add({ data }).then({ ...data, comments }));
        API.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const handleRemoveComment = (id) => {
        API.comments.remove(id).then((id) => {
            setComments(comments.filter((com) => com._id !== id));
        });
    };

    const sortedCommets = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <CommentForm onSubmit={handleAddComment} />
                </div>
            </div>

            {sortedCommets.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedCommets}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

Comments.propTypes = {
    id: PropTypes.number
};

export default Comments;
