
import { 
    PASSWORD_OLD_CHNAGED,
    PASSWORD_NEW_CHNAGED,
    NEW_PASSWORD_CONFIRM_CHNAGED,
    EDIT_PASSWORD_FAIL,
    EDIT_PASSWORD_SUCCESS,
    GO_BACK,
    WRONG_PASSWORDS
 } from '../actions/types';

const INITIAL_STATE = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case PASSWORD_OLD_CHNAGED:
            return { ...state, oldPassword: action.payload };

        case PASSWORD_NEW_CHNAGED:
            return { ...state, newPassword: action.payload };
               
        case NEW_PASSWORD_CONFIRM_CHNAGED:
            return { ...state, confirmNewPassword: action.payload };
            
        case EDIT_PASSWORD_SUCCESS:
            return {...state, INITIAL_STATE};
        
        case EDIT_PASSWORD_FAIL:
            return {...state, INITIAL_STATE};
        
        case GO_BACK:
            return {...state, INITIAL_STATE};

        case WRONG_PASSWORDS:
            return {...state, INITIAL_STATE};

        default:
            return state;
    }
};