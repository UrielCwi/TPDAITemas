import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import ContactListScreen from '../components/ContactListScreen';
import EmergencyNumberScreen from '../components/EmergencyNumberScreen';
import AboutScreen from '../components/AboutScreen';  // Asegúrate de que la ruta sea correcta
import WeatherScreen from '../components/WeatherScreen';

const Tab = createMaterialTopTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tab.Screen name="Contacts" component={ContactListScreen} />
        <Tab.Screen name="Emergency" component={EmergencyNumberScreen} />
        <Tab.Screen name="About" component={AboutScreen} /> 
        <Tab.Screen name="Weather" component={WeatherScreen} />  
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f8f8f8',
    elevation: 2, // Sombra en Android
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
