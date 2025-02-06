import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import HomeScreen from './src/screens/HomeScreen'; 
import AddNoteScreen from './src/components/NoteForm'; 
import NoteDetailScreen from './src/components/NoteItem'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>  
      <Stack.Navigator initialRouteName="Home">  
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Mes Notes' }} 
        />
        <Stack.Screen
          name="AddNote"
          component={AddNoteScreen}
          options={{ title: 'Ajouter une Note' }} 
        />
        <Stack.Screen
          name="NoteDetail"
          component={NoteDetailScreen}
          options={{ title: 'Détails de la Note' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
