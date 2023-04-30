import React, { useEffect } from "react";
import CommentForm from "../comments/commentForm";
// import { useParams } from "react-router-dom";
// import API from "../../api";
import CommentsList from "../comments/commentsList";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import _ from "lodash";
// import { useComments } from "../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadComments,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { userId } = useParams();
    console.log("userId", userId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadComments(userId));
    }, [userId]);

    const comments = useSelector(getComments());
    const isLoading = useSelector(getCommentsLoadingStatus());

    // const { userId } = useParams();
    // console.log("params", params);
    // console.log(typeof userId);

    // const [comments, setComments] = useState([]);

    // const { createComment, comments, removeComment } = useComments();

    // useEffect(() => {
    //     API.comments
    //         .fetchCommentsForUser(userId)
    //         .then((data) => setComments(data));
    // }, []);

    // console.log("comments", comments);

    const handleAddComment = (data) => {
        // console.log(API.comments.add({ data }).then({ ...data, comments }));
        console.log("dataComment", data);
        // createComment([...comments, data]);
        console.log("createComment", createComment);
        dispatch(
            createComment({
                ...data,
                _id: nanoid(),
                pageId: userId,
                created_at: Date.now(),
                userId
            })
        );
        // API.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
    };

    const handleRemoveComment = (commentId) => {
        console.log("click");
        console.log("commentId", commentId);
        removeComment(commentId);

        // API.comments.remove(id).then((id) => {
        //     setComments(comments.filter((com) => com._id !== id));
        // });
    };

    const sortedCommets = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <CommentForm onSubmit={handleAddComment} />
                </div>
            </div>

            {sortedCommets.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedCommets}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading..."
                        )}
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
