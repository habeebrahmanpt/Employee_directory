import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screen/Home';
import Details from '../screen/Details';



const Stack = createNativeStackNavigator();

function Navigation() {
     return (
          <NavigationContainer>
               <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Details" component={Details} />
               </Stack.Navigator>
          </NavigationContainer>
     );
}

export default Navigation;

