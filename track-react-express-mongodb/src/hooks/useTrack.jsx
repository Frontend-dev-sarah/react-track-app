import { useContext } from 'react';
import { Context as LocationContext } from '../contexts/LocationContext';
import { Context as TrackContext } from '../contexts/TrackContext';

export default (navigation) => {
const { createTrack } = useContext(TrackContext);
const { state: { locations, name }, reset} = useContext(LocationContext);

const saveTrack = async () => {
   await createTrack(name, locations);
   reset();
   navigation.navigate('Track List')
}
return [saveTrack];
};
