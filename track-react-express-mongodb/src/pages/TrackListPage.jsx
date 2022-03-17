import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../contexts/TrackContext';

const TrackDetailPage = ({ navigation }) => {
    const { state, fetchTracks } = useContext(TrackContext);
    navigation.addListener('focus', () => {fetchTracks()})
    
    
    return <View>
        <FlatList
        data = {state}
        keyExtractor = { item => item._id}
        renderItem = {({item}) => {
            return(
                <TouchableOpacity onPress = {() => navigation.navigate('Track Detail', {id: item._id})}>

                    <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>
                        {item.name}
                        </ListItem.Title>
                    </ListItem.Content>
                    </ListItem>
                 
                 </TouchableOpacity>
            )
        }}
        
        />
    </View>
}

export default TrackDetailPage;