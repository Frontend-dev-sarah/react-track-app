import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
    baseURL: 'http://268b606f9443.ngrok.io'
});
instance.interceptors.request.use(
    //1st func is called anytime doing a request
    async (config) => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    }, 
    //2nd func is called anytime occuring an error
    (error)=>{
        return Promise.reject(error);
    }
);


export default instance;