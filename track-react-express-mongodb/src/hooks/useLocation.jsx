import { useState, useEffect, useContext } from 'react';
import { Context as LocationContext } from '../contexts/LocationContext';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { useIsFocused } from '@react-navigation/native';



export default (navigation, callback) => {
    const [error, setError] = useState(null);
    const { state } = useContext(LocationContext);
    const isFocused = useIsFocused();


   
        
    // useEffect(() => {
    //     const unsubscribe  = navigation.addListener('focus', () => {
    //         startWatching();
    //     });
    //     return unsubscribe;
       
    // }, [navigation]);
    // useEffect(() => {
    //     navigation.addListener('focus', () => {
    //         startWatching();
    //     });
       
    // }, [navigation]);

    useEffect(
        () => {
            let subscriber;
            const startWatching = async () => {
                try {      
                 const {granted} = await requestPermissionsAsync();     
                   subscriber =  await watchPositionAsync( 
                        {
                         accuracy: Accuracy.BestForNavigation,
                         timeInterval: 1000,
                         distanceInterval: 10
                        }, 
                        // location => {
                        //   addLocation(location)
                        // }
                        callback
                     );   
                    navigation.addListener('blur', () => {
                        if(subscriber&&!state.recording){
                            subscriber.remove();     
                        }

                         subscriber = null;
                                  
                    })
                
                     if(!granted) {
                        throw new Error('Location permission not granted');
                    }             
        
                } catch (e) {
                    setError(e)
                }
            };


            if(state.recording||isFocused){
                startWatching();
            }else if(!state.recording){
                if (subscriber) {
                    subscriber.remove();
                }
                subscriber = null;
            }
        },
    [state.recording, isFocused]);

    return [error];

};