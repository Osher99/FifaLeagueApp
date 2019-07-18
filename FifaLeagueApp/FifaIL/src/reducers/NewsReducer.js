import { 
    NEWS_FETCH
 } from '../actions/types';

const INITIAL_STATE = {
    news: {}
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case NEWS_FETCH:
            return { ...state, news: action.payload };

        default:
            return state;
    }
};