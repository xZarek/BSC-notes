// ----- ACTION -----
export const INITIAL_DATA = "INITIAL_DATA";
export const ACTIVE_ROW_DATA = 'ACTIVE_ROW_DATA';
export const INFO_NOTE = 'INFO_NOTE';

// ----- ACTION CREATORS -----
export const initialDataLoad = data => {
    return dispatch => {
        dispatch({
            type: INITIAL_DATA,
            data
        });
    };
};
export const getActiveRowData = (data) => {
    return dispatch => {
        dispatch({
            type: ACTIVE_ROW_DATA,
            data
        });
    };
};

export const infoNoteLoad = (data) => {
    return dispatch => {
        dispatch({
            type: INFO_NOTE,
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
        case INFO_NOTE:
            return {
                ...state,
                infoNote: action.data
            };
        case ACTIVE_ROW_DATA:
            return {
                ...state,
                activeRowData: action.data,
            }
        default:
            return state;
    }
}
