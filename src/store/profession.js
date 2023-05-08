import { createSlice } from "@reduxjs/toolkit";
import ProfessionService from "../services/profession.services";

const professionSlice = createSlice({
    name: "profession",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionRequested: (state) => {
            state.isLoading = true;
        },
        professionReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionReducer, actions } = professionSlice;
const { professionRequested, professionReceved, professionRequestFiled } =
    actions;

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProfession = () => async (dispatch, getState) => {
    const { lastFetch } = getState().profession;
    if (isOutDated(lastFetch)) {
        dispatch(professionRequested());
        try {
            const { content } = await ProfessionService.get();
            dispatch(professionReceved(content));
        } catch (error) {
            dispatch(professionRequestFiled(error.message));
        }
    }
};

export const getProfession = () => (state) => state.profession.entities;
export const getProfessionLoadingStatus = () => (state) =>
    state.profession.isLoading;

export const getProfessionById = (professionId) => (state) => {
    // console.log("state.profession.entities", state.profession.entities);
    const items = state.profession.entities;
    // console.log("items", items);
    return items.find((p) => p._id === professionId);
};

// console.log("getProfession", getProfession);
export default professionReducer;
