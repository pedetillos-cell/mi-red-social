import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import App from './App'; // Tu app actual que FUNCIONA

// Crear el navegador
const Stack = createStackNavigator();

// Crear componente de navegación
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={App} 
          options={{ title: 'VRYNO - Inicio' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;