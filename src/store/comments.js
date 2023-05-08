import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
// import ProfessionService from "../services/profession.services";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
        // lastFetch: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            // state.lastFetch = Date.now();
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (com) => com._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions;

// function isOutDated(date) {
//     if (Date.now() - date > 10 * 60 * 1000) {
//         return true;
//     }
//     return false;
// }

export const loadComments = (userId) => async (dispatch) => {
    // console.log("getState", getState());
    // const { lastFetch } = getState().profession;
    // console.log("lastFetch", lastFetch);
    // if (isOutDated(lastFetch)) {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};
// };

export const createComment = (payload) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.createComment(payload);
        console.log({ content });
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    // dispatch(commentsRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        console.log(content);
        if (content === null) {
        dispatch(commentRemoved(content));
        }
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
