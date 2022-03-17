import React, { useContext } from 'react';
import createDataContext from './createDataContext';
import trackApi from '../api/tracker';

const trackReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_TRACKS':
            return action.payload;
        default:
            return state;
    }
};

const fetchTracks = dispatch => {
    return async () => {
        const response = await trackApi.get('/tracks');
        dispatch({ type: 'FETCH_TRACKS', payload: response.data})

    }
}

const createTrack = () => {
    return async (name, locations) => {
      await trackApi.post('/tracks', { name,locations })
    }
}

export const { Provider, Context } = createDataContext(
    trackReducer,
    {fetchTracks, createTrack},
    []
    )