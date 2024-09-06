import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import ContactListScreen from '../components/ContactListScreen';
import EmergencyNumberScreen from '../components/EmergencyNumberScreen';

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
        <Tab.Screen name="Contactos" component={ContactListScreen} />
        <Tab.Screen name="Emergencia" component={EmergencyNumberScreen} />
        {/* Agrega más pestañas aquí */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f8f8f8',
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AppNavigator;
