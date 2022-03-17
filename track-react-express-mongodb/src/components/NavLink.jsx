import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavLink = ({linkText, routeName}) => {
    const navigation = useNavigation();

    return <TouchableOpacity 
    style = {styles.container}
    onPress = {() => navigation.navigate(routeName)}>
        <Text>{linkText}</Text>
    </TouchableOpacity>
    }

    const styles = StyleSheet.create({
        container: {
            marginTop: 30
        }
    })

export default NavLink;

