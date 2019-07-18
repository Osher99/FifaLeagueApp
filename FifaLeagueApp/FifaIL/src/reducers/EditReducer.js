import { 
    NEW_NAME_CHANGED,
    NEW_IGN_CHANGED,
    NEW_PHONE_CHANGED,
    EDIT_SUCCESS,
    GO_BACK,
    TRY_EDIT,
    EDIT_FAIL
 } from '../actions/types';

const INITIAL_STATE = {
    fullname: '',
    ign: '',
    phone: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case NEW_NAME_CHANGED:
            return { ...state, fullname: action.payload };

        case NEW_IGN_CHANGED:
            return { ...state, ign: action.payload };
               
        case NEW_PHONE_CHANGED:
            return { ...state, phone: action.payload };

        case TRY_EDIT:
            return {...state, loading: true};
        
        case EDIT_FAIL:
            return {...state, INITIAL_STATE};

        case EDIT_SUCCESS:
            return {...state, INITIAL_STATE};
        
        case GO_BACK:
            return {...state, INITIAL_STATE};

        default:
            return state;
    }
};