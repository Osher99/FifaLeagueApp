import { 
    RECOVER_PASSWORD,
    SENT_EMAIL_FAIL,
    SENT_EMAIL_SUCCESS
 } from '../actions/types';

const INITIAL_STATE = {
     email: ''
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        
        case RECOVER_PASSWORD:
            return { ...state, email: action.payload };

        case SENT_EMAIL_FAIL:
            return INITIAL_STATE;

        case SENT_EMAIL_SUCCESS:
            return INITIAL_STATE;

        default:
            return state;
    }
};