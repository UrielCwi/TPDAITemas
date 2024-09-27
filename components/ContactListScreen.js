import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SecureStore from 'expo-secure-store';
import { showError } from '../components/errorHelper.js'; 

const ContactListScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [emergencyNumbers, setEmergencyNumbers] = useState([]);

  useEffect(() => {
    fetchEmergencyNumbers();
  }, []);

  const fetchEmergencyNumbers = async () => {
    try {
      const storedNumbers = await SecureStore.getItemAsync('emergencyNumbers');
      if (storedNumbers) {
        setEmergencyNumbers(JSON.parse(storedNumbers));
      }
    } catch (error) {
      showError('Error fetching emergency numbers');
    }
  };

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync();
      if (data.length > 0) {
        setContacts(data);
        fetchEmergencyNumbers(); // Refresh emergency numbers when contacts are loaded
      } else {
        showError('No contacts found on this device.');
      }
    } else {
      showError('Permission denied to access contacts.');
    }
  };

  const formatPhoneNumber = (number) => {
    return number.replace(/\D/g, '');
  };

  const renderItem = ({ item }) => {
    const formattedNumber = item.phoneNumbers ? formatPhoneNumber(item.phoneNumbers[0].number) : '';
    const isEmergency = emergencyNumbers.some(emergencyNumber => formattedNumber === formatPhoneNumber(emergencyNumber));

    return (
      <View style={styles.contactItem}>
        <Text style={styles.contactName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={[styles.contactNumber, isEmergency && styles.emergencyNumber]}>
          {formattedNumber || 'No Phone Number'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Button title="Cargar Contactos" onPress={loadContacts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
    color: '#555',
  },
  emergencyNumber: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ContactListScreen;
