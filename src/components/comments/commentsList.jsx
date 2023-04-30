// import React from "react";
import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onRemove }) => {
    console.log("comments", comments);
    return comments.map((comment) => (
        <Comment key={comment._id} {...comment} onRemove={onRemove} />
    ));
};

CommentsList.propTypes = {
    onRemove: PropTypes.func,
    comment: PropTypes.array
};

export default CommentsList;
