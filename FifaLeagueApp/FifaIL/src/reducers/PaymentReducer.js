import { 
    PAYMENT_FETCH
 } from '../actions/types';

const INITIAL_STATE = {
    methods: {}
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case PAYMENT_FETCH:
            console.log (action.payload)
            return { ...state, methods: action.payload };

        default:
            return state;
    }
};