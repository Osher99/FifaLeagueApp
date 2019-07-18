import { 
    FETCH_REWARDS
 } from '../actions/types';

const INITIAL_STATE = {
    rewards: {}
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_REWARDS:
            return { ...state, rewards: action.payload };

        default:
            return state;
    }
};