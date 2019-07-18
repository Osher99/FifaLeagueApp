import { 
    FETCH_TABLES
 } from '../actions/types';

const INITIAL_STATE = {
    tables: {}
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_TABLES:
            return { ...state, tables: action.payload };

        default:
            return state;
    }
};