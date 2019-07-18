import { 
    FIXTURE_FETCH
 } from '../actions/types';

const INITIAL_STATE = {
    matches: {}
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FIXTURE_FETCH:
            return { ...state, matches: action.payload };

        default:
            return state;
    }
};