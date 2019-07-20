import { 
    VIDEOS_FETCH
 } from '../actions/types';

const INITIAL_STATE = {
    videos: {}
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case VIDEOS_FETCH:
            return { ...state, videos: action.payload };

        default:
            return state;
    }
};