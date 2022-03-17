import React , { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
        
        return <>   
            <Text h3>{props.title}</Text>
            <Spacer/>
            <Input label = "Email" 
            autoCapitalize = "none"
            autoCorrect = {false}
            value = {email}
            onChangeText = {(value) => {setEmail(value)}}
            />
            <Spacer/>
            <Input label = "Password"
            secureTextEntry
            value = {password}
            autoCapitalize = "none"
            autoCorrect = {false}
            onChangeText = {(value) => {setPassword(value)}}/>
            <Spacer/>
            {props.errorMessage? <Text style = {styles.error}>{props.errorMessage}</Text>: null}        
            <Button title = {props.buttonTitle} onPress={() => props.onSubmit({ email, password })}/>
        </>
    

}
const styles  = StyleSheet.create({
    error: {
        color: 'red',
        margin: 5
    }
})
export default AuthForm;