import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Context as AuthContext } from './src/contexts/authContext';
import { Provider as LocationProvider } from './src/contexts/LocationContext';

import AccountPage from './src/pages/AccountPage';
import SigninPage from './src/pages/SigninPage';
import SignupPage from './src/pages/SignupPage';
import TrackCreatePage from './src/pages/TrackCreatePage';
import TrackListPage from './src/pages/TrackListPage';
import TrackDetailPage from './src/pages/TrackDetailPage';

import { Provider as AuthProvider } from './src/contexts/authContext';
import { Provider as TrackProvider } from './src/contexts/TrackContext';


import { setNavigator } from './src/navigationRef';
import { View } from 'react-native';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const accountStack = createStackNavigator();
const trackcreateStack = createStackNavigator();
const authFlow = createStackNavigator();
const trackFlow = createStackNavigator();
const tabFlow = createBottomTabNavigator();



const trackFlowScreens = () => {
  return (
    <trackFlow.Navigator>
      <trackFlow.Screen 
      name = "Track List" 
      component = {TrackListPage}
      options = {{title: "Track History"}}
      />
      <trackFlow.Screen 
      name = "Track Detail" 
      component = {TrackDetailPage}
      options ={{title: "Track Detail"}}
      />
    </trackFlow.Navigator>
  );
}
const accountStackScreen = () => {
  return (
    <accountStack.Navigator>
      <accountStack.Screen name = "Account" component = {AccountPage} 
      />
      <accountStack.Screen name ="Signup" component = {SignupPage}/>
      <accountStack.Screen name ="Signin" component = {SigninPage}/>
    </accountStack.Navigator>
  );
}

const trackCreateStackScreen = () => {
  return (
    <trackcreateStack.Navigator>
      <trackcreateStack.Screen name = "Create Tracks" options = {{title: "Create Track"}} component = {TrackCreatePage}/>
    </trackcreateStack.Navigator>
  )
}

const App = React.forwardRef((props, ref) => {
  const { state, restoretoken } = useContext(AuthContext);
  useEffect(() => {
    restoretoken() 
  }, [])

  return (
  <NavigationContainer ref={ref}>
    {state.isLoading ? <View/> : state.token ?
    <tabFlow.Navigator
    screenOptions = {({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
// return <FontAwesome name="plus" size={24} color="black" />
        let iconName;
        let iconColor;
        focused? iconColor = '#0080ff': iconColor = 'grey'
        
        switch(route.name) {
          case "Track Create":
             iconName = "plus";
             break;
          case "Account":
              iconName = "account-box";
             break;
          case "Track List":
             iconName = "list-ul";
             break;   
          default:
            break;
          }
          if(route.name === "Track Create" || route.name === "Track List") {
            return <FontAwesome name={iconName} size={24} color={iconColor} />
          } 
           if(route.name === "Account") {
            return <MaterialIcons name={iconName} size={24} color={iconColor} />
          }
       }
    }
    )}
    >
      <tabFlow.Screen 
      name = "Track Create" 
      component = {trackCreateStackScreen}
      />
      <tabFlow.Screen name = "Track List" component = {trackFlowScreens}/>
      <tabFlow.Screen name = "Account" component = {accountStackScreen}/>
      
    </tabFlow.Navigator> 
    :
    <authFlow.Navigator>
      <authFlow.Screen name ="Signup" component = {SignupPage}
       options={{
        headerShown: false
      }}
    />
     <authFlow.Screen name ="Signin" component = {SigninPage}
      options={{
        headerShown: false
      }}/>
      {/* <authFlow.Screen name = "Auth" component = {authtabFlowScreens}
      options={{
        headerShown: false
    }}
      /> */}
    </authFlow.Navigator>
    }   
  </NavigationContainer>
  );
});


export default () => {
  return (
    <LocationProvider>
      <TrackProvider>
      <AuthProvider>
     <App
     ref = { navigator => {setNavigator(navigator)}}
     />
  
    </AuthProvider>
    </TrackProvider>
    </LocationProvider>
  );
}