import { 
    GET_USER,
 } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case GET_USER:
            return action.payload;

        default:
            return state;
    }
};