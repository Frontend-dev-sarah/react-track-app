import React from 'react';
import createDataContext from './createDataContext';
import trackApi from '../api/tracker';
import AsyncStorage from '@react-native-community/async-storage';
// import { navigate } from '../navigationRef';


const authActions = (state, action) => {
    switch (action.type) {
        case 'ADD_ERROR': 
            return { ...state, errorMessage: action.payload, isLoading: false}
        case 'CLEAR_ERROR':
            return { ... state, errorMessage: '', isLoading: false}
        case 'AUTH':
            return {errorMessage: '', token: action.payload, isSignout: false, isLoading: false };
        case 'RESTORE_TOKEN':
            return {...state, token: action.payload, isLoading: false}
        case 'IS_FETCHING':
            return{ ...state, errorMessage: '', isLoading: false }
        case 'SIGN_OUT': 
            // return Object.assign({}, state);
            return {token: null, errorMessage: '', isLoading: false}
        default:
            return state;
    }
};

const clear_error = dispatch => {
    return () => {
        dispatch ({type: 'CLEAR_ERROR'})
    }
}
const signup = dispatch => {
    return async ({ email, password}) => {
        try {
            const response = await trackApi.post('/signup', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            
            dispatch({type: 'AUTH', payload: response.data.token});
            // navigate('Account');
        } catch (error) {
            dispatch({ type: 'ADD_ERROR', payload: 'sign up wrong'})
            console.error(error.message);
        }
    }
}
 

const signin = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackApi.post('/signin', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'AUTH', payload: response.data.token});

        } catch (error) {
            dispatch({ type: 'ADD_ERROR', payload: 'sign in wrong'})
            console.log(error.message);
        }
    }
}
const signout = dispatch => {
    return async () => {
        console.log('singt out ?')
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'SIGN_OUT'})
    }
}

const restoretoken = dispatch => {
    return async () => {
        dispatch({ type: 'LOADING'});
        let token  = await AsyncStorage.getItem('token');
      
        if(token) {
            dispatch({ type: 'RESTORE_TOKEN', payload: token })
        }else{
            dispatch({ type: 'IS_FETCHING'})
        }     
    }   
}


export const { Provider, Context } = createDataContext(
    authActions, //action creator
    { signup, signin, signout, restoretoken, clear_error }, //action
    { token: null, errorMessage: '', isSignout: true, isLoading: false }//state
);