import { 
    FETCH_LINKS
 } from '../actions/types';

const INITIAL_STATE = {
    links: {}
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_LINKS:
            return { ...state, links: action.payload };

        default:
            return state;
    }
};