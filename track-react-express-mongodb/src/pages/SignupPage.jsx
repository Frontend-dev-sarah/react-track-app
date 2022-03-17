import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

import { Context as AuthContext } from '../contexts/authContext';

const SignupPage = ({navigation}) => {
    const { state, signup, clear_error } = useContext(AuthContext);
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            clear_error();
        })
        return unsubscribe;
    }, [])
  

    return <View style = {styles.container}>
        <AuthForm
        title = 'Sign up'
        buttonTitle = 'Sign up'
        errorMessage = {state.errorMessage}
        onSubmit = {signup}
        />
        <NavLink
            linkText = 'Already have an account ? Login'
            routeName = 'Signin'
        />
    </View>
}

//it should be defined in App.js file, the follow codes not work
SignupPage.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: {
        color: 'red',
        margin: 5
    },
    signin: {
        marginTop: 30, 
        
    }
})
export default SignupPage;