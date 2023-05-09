import { createSlice } from "@reduxjs/toolkit";
import QualityService from "../services/quality.services";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions;
function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}
export const loadQualitiesList = () => async (dispatch, getState) => {
    // console.log("getState", getState());
    const { lastFetch } = getState().qualities;
    // console.log("lastFetch", lastFetch);
    if (isOutDated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await QualityService.get();
            dispatch(qualitiesReceved(content));
        } catch (error) {
            dispatch(qualitiesRequestFiled(error.message));
        }
    }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        const qualitiesArray = [];
        if (qualitiesIds) {
            for (const qualId of qualitiesIds) {
                // console.log(qualId);
                // console.log(state.qualities.entities);
                for (const quality of state.qualities.entities) {
                    if (quality._id === qualId) {
                        qualitiesArray.push(quality);
                        break;
                    }
                }
                // console.log(qualitiesArray);
            }
            return qualitiesArray;
        }
        return [];
    }
};

export default qualitiesReducer;
