import { 
    MESSAGE_SENT,
    MESSAGE_CHANGED
 } from '../actions/types';

const INITIAL_STATE = {
    message: ''
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case MESSAGE_CHANGED:
            return { ...state, message: action.payload };

        case MESSAGE_SENT:
                return {...state, INITIAL_STATE};
        
        default:
            return state;
    }
};