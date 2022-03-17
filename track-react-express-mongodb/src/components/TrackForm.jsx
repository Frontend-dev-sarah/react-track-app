import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../contexts/LocationContext';
import useSaveTrack from '../hooks/useTrack';

const TrackForm = ({navigation}) => {
    const { startRecording, stopRecording, state, changeName} = useContext(LocationContext);
    const [saveTrack] = useSaveTrack(navigation);
    
    return (
        <>
        <Spacer/>
        <Input 
        value = {state.name}
        onChangeText = {changeName}
        placeholder = "Enter a name"/>
        {state.recording 
        ? <Spacer>
        <Button title = "Stop" onPress = {() => stopRecording()}/>
        </Spacer>
        :<Spacer><Button title = "Start recording" onPress = {() => startRecording()}/></Spacer>}
        {!state.recording&&state.locations.length 
        ?<Spacer>
        <Button title = "Save tracks" onPress={() => saveTrack()}/>
        </Spacer>
        :null}
        
        </>
    )
}

export default TrackForm;