import React, { useContext } from 'react';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../contexts/authContext';

const AccountPage = () => {
    const { signout } = useContext(AuthContext);
    return (
    <>
        <Spacer/>
        <Button title = 'Sign Out' onPress = {signout}/>
    </>)
}

export default AccountPage;