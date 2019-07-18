import { 
    RULES_FETCH
 } from '../actions/types';

const INITIAL_STATE = {
    rules: []
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case RULES_FETCH:
            console.log(action.payload)
            return { ...state, rules: action.payload };

        default:
            return state;
    }
};