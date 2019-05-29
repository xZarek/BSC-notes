// ----- ACTION -----
export const INITIAL_DATA = "INITIAL_DATA";

// ----- ACTION CREATORS -----
export const initialDataLoad = data => {
    return dispatch => {
        dispatch({
            type: INITIAL_DATA,
            data
        });
    };
};

// ----- REDUCER -----
const initialState = {
    initialNotes: []
};

export default function notes(state = initialState, action) {
    switch (action.type) {
        case INITIAL_DATA:
            return {
                ...state,
                initialNotes: action.data
            };
        default:
            return state;
    }
}
