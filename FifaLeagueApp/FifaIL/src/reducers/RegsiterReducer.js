import { 
    REGISTER_EMAIL_CHANGED,
    REGISTER_PASSWORD_CHANGED,
    CONFIRM_PASSWORD_CHANGED,
    IGN_CHANGED,
    //DATE_CHANGED,
    PHONE_CHANGED,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    NAME_CHANGED,
    REGISTER_USER_FAIL,
    CONFIRM_EMAIL_CHANGED
 } from '../actions/types';

const INITIAL_STATE = {
    fullname: '',
     email: '',
     confirmEmail: '',
     password: '',
     confirmPassword:  '',
     ign: '',
     phone: '',
     birthdate: '',
     loading: false
     };

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        
        case NAME_CHANGED:
           return { ...state, fullname: action.payload };

        case REGISTER_EMAIL_CHANGED:
            return { ...state, email: action.payload };
        
        case REGISTER_PASSWORD_CHANGED:
            return { ...state, password: action.payload };

        case CONFIRM_PASSWORD_CHANGED:
            return {...state, confirmPassword: action.payload };
        
        case IGN_CHANGED:
            return {...state, ign: action.payload };
        
        case CONFIRM_EMAIL_CHANGED:
            return {...state, confirmEmail: action.payload };
        
        // // case DATE_CHANGED:
        // //     return {...state, date: action.payload };

        case PHONE_CHANGED:
            return {...state, phone: action.payload };

        case LOGIN_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload };

        case LOGIN_USER:
            return {...state, loading: true };

        case REGISTER_USER_FAIL:
                return {
              ...state, 
               loading: false,
                email: '',
                password: '',
                confirmPassword: '',
                confirmEmail: ''
            };

        case LOGIN_USER_FAIL:
            return {
            ...state ,
            fullname: '',
            email: '',
            password: '',
            confirmPassword: '',
            confirmEmail: '',
            ign: '',
            phone: '',
            birthdate: '', 
            loading: false 
        };

        default:
            return state;
    }
};