import {
    CHANGE_ACTION_TYPE, CHANGE_MEDIA_NUMBER, CLEAR_SEARCH, SET_LOCATIONS, SET_RELATION, SET_TAGS,
    SET_UNFOLLOW
} from "./types";

export const clearSearch = (activeTab) => ({
    type: CLEAR_SEARCH,
    payload: activeTab

});
export const setTags = tags => ({
    type: SET_TAGS,
    payload: tags
});
export const setLocations = locations => ({
    type: SET_LOCATIONS,
    payload: locations
});
export const setRelation = relation => ({
    type: SET_RELATION,
    payload: relation
});
export const setUnfollow = unfollow => ({
    type: SET_UNFOLLOW,
    payload: unfollow
});
export const changeActionType = action => ({
    type: CHANGE_ACTION_TYPE,
    payload: action
});
export const changeMediaNumber = mediaNumber => ({
    type: CHANGE_MEDIA_NUMBER,
    payload: mediaNumber
});
