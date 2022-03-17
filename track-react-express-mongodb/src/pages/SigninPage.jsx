import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {Context as AuthContext }from '../contexts/authContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninPage = ({ navigation }) => {
    const { state, signin, clear_error } = useContext(AuthContext);
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            clear_error();
        })
        return unsubscribe;
    }, [])  
    return <View style={styles.container}>
        <AuthForm
        title = 'Sign in'
        buttonTitle = 'Sign in'
        errorMessage = {state.errorMessage}
        onSubmit = {signin}
        />
        <NavLink
            linkText = "Don't have an account ? Sign up"
            routeName = 'Signup'
        />     
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
export default SigninPage;