
// ----- ACTION -----
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SHOW_CONFIRM_MODAL = 'SHOW_CONFIRM_MODAL';
export const HIDE_CONFIRM_MODAL = 'HIDE_CONFIRM_MODAL';

// ----- ACTION CREATORS -----
export const showModal = (type, props) => ({
    type: SHOW_MODAL,
    payload: {
        type,
        props,
        show: true,
        noScroll: true
    }
});

export const showConfirmModal = (typeConfirm, props) => ({
    type: SHOW_CONFIRM_MODAL,
    payload: {
        typeConfirm,
        props,
        showConfirm: true,
        noScroll: true
    }
});

export const hideModal = () => ({
    type: HIDE_MODAL,
    payload: {
        show: false,
        noScroll: false
    }
});
export const hideConfirmModal = () => ({
    type: HIDE_CONFIRM_MODAL,
    payload: {
        showConfirm: false,
        noScroll: false
    }
});


// ----- REDUCER -----
const initialState = {
    type: null,
    typeConfirm: null,
    props: {},
    show: false,
    showConfirm: false,
    noScroll: false
};

export default function modal(state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                type: action.payload.type,
                props: action.payload.props,
                show: action.payload.show,
                noScroll: action.payload.noScroll
            };
        case HIDE_MODAL:
            return {
                ...state,
                show: action.payload.show,
                noScroll: action.payload.noScroll
            };
        case HIDE_CONFIRM_MODAL:
            return {
                ...state,
                showConfirm: action.payload.showConfirm,
                noScroll: action.payload.noScroll
            };
        case SHOW_CONFIRM_MODAL:
            return {
                ...state,
                typeConfirm: action.payload.typeConfirm,
                props: action.payload.props,
                showConfirm: action.payload.showConfirm,
                noScroll: action.payload.noScroll
            };

        default:
            return state;
    }
}








