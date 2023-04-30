import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
// import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    // console.log("userId", userId);

    // const { currentUser } = useAuth();
    const currentUserId = useSelector(getCurrentUserId());

    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // setComments(null);
        // setLoading(false);
        getComments();
    }, [userId]);

    async function createComment(data) {
        // console.log(data);
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            // userId: currentUser._id
            userId: currentUserId
        };

        try {
            const { content } = await commentService.createComment(comment);
            console.log(content);
            setComments((prevState) => [...prevState, content]);
        } catch (error) {
            errorCatcher(error);
        }
        // console.log(comment);
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            // console.log("content", content);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id);
            console.log(content);
            if (content === null) {
                setComments((prevState) =>
                    prevState.filter((c) => c._id !== id)
                );
            }
        } catch (error) {
            errorCatcher(error);
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <CommentsContext.Provider
            value={{ comments, createComment, isLoading, removeComment }}
        >
            {!isLoading ? children : "Loading"}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
