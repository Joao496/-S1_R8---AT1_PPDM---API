import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Personagens from './src/screens/Personagens';
import DetalhesPersonagem from './src/screens/DetalhesPersonagem';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Personagens" component={Personagens} />
        {/* O nome aqui DEVE ser exatamente DetalhesPersonagem */}
        <Stack.Screen name="DetalhesPersonagem" component={DetalhesPersonagem} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}