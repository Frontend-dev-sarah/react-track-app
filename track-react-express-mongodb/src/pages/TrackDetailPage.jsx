import React, { useContext } from 'react';
import { Context as TrackContext } from '../contexts/TrackContext';
import { View, Text, StyleSheet } from 'react-native';
import MapView, {Polyline} from 'react-native-maps';

const TrackDetailPage = ({ route, navigation }) => {
    const track_id = route.params.id;
    const { state } = useContext (TrackContext);

    const singleTrack = state.find(t => t._id === track_id);

    const initialCoords = singleTrack.locations[0].coords;

    return <View>
        <Text style = {styles.trackTitle}>{singleTrack.name}</Text>
        <MapView 
        initialRegion = {{
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
            ...initialCoords

        }}
        style = {styles.map}
        >
        <Polyline coordinates ={singleTrack.locations.map((loc) => loc.coords)}/>
        </MapView>
    </View>
}
const styles = StyleSheet.create({
    map: {
        height: 300
    },
    trackTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        alignSelf: 'center'
    }
})
export default TrackDetailPage;