import { 
    TOURS_FETCH
 } from '../actions/types';

const INITIAL_STATE = {
    tours: {}
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case TOURS_FETCH:
            return { ...state, tours: action.payload };

        default:
            return state;
    }
};