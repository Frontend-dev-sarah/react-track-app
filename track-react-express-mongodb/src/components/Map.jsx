import React, { useContext } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../contexts/LocationContext';


const Map  = () => {

    const { state: {currentLocation, locations} } = useContext(LocationContext);
    const coords = locations.map((loc) => loc.coords)

    if (currentLocation) {
        return (
        <View>
            <MapView style = {styles.map}
            initialRegion = {{
                ...currentLocation.coords,
                // latitude: 37.33233,
                // longitude: -122.03121,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01

            }}
            // region = {{
            //      ...currentLocation.coords,
            //     latitudeDelta: 0.01,
            //     longitudeDelta: 0.01 
            // }}
            >
            <Polyline
            coordinates = {coords}
            />
            <Circle
            center = {currentLocation.coords}
            radius = {20}
            strokeColor = 'rgba(158, 158, 255, 1.0)'
            fillColor = 'rgba(158, 158, 255, 0.3)'
            />
            </MapView>
        </View>
       );
        
        
    } else {
    return (
        <ActivityIndicator
        style={{marginTop: 30}}
        size = 'large'/> 
    )
}
}
const styles  = StyleSheet.create({
    map: {
        height: 300
    }
})
export default Map;
