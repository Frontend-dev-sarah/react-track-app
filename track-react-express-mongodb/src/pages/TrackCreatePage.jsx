// import '../_mockLocation';
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Map from '../components/Map';
// import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
// import { useIsFocused } from '@react-navigation/native';

import { Context as LocationContext } from '../contexts/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const TrackCreatePage = ({navigation}) => {
    const { addLocation, state } = useContext(LocationContext);
    const [error] = useLocation(navigation, (location) => addLocation(location) );
   
    // console.log('state.locations.length')
    // console.log(state.locations.length)
    return <View>
        <Map/>
        {error ? <Text style = {styles.error}>Please enable location services </Text>: null}
        <TrackForm navigation = {navigation}/>
    </View>
}
const styles = StyleSheet.create({
    error: {
        color: 'red',
        marginVertical: 15
    }
})

export default TrackCreatePage;