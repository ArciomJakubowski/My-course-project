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
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (com) => com._id !== action.payload.id
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFiled,
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
        console.log("content", content);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};
// };

export const createComment = (payload) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.createComment(payload);
        console.log({ content });
        dispatch(commentCreated(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.commentRemove(commentId);
        console.log({ content });
        if (content === null) {
            dispatch(commentRemoved(content));
            history.push(`/users/${content._id}`);
        }
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

// export const getProfessionById = (professionId) => (state) => {
//     console.log("state.profession.entities", state.profession.entities);
//     const items = state.profession.entities;
//     console.log("items", items);
//     return items.find((p) => p._id === professionId);
// };

// console.log("getProfession", getProfession);
export default commentsReducer;
