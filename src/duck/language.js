// ----- ACTION -----
export const SELECT_LANGUAGE = "SELECT_LANGUAGE";


// ----- ACTION CREATORS -----
export const selectLanguageLoad = data => {
    return dispatch => {
        dispatch({
            type: SELECT_LANGUAGE,
            data
        });
    };
};


// ----- REDUCER -----
const initialState = {
    loc: "cz"
};

export default function language(state = initialState, action) {
    switch (action.type) {
        case SELECT_LANGUAGE:
            return {
                ...state,
                loc: action.data
            };
        default:
            return state;
    }
}
