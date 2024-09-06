import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactListScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [permissionStatus, setPermissionStatus] = useState(null);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync();
      if (data.length > 0) {
        setContacts(data);
      }
    }
    setPermissionStatus(status);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <View style={styles.container}>
      {permissionStatus === 'granted' ? (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <Text style={styles.contactName}>
                {item.firstName} {item.lastName}
              </Text>
              {item.phoneNumbers && item.phoneNumbers.length > 0 ? (
                <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
              ) : (
                <Text style={styles.noNumber}>No hay numero de telefono</Text>
              )}
            </View>
          )}
        />
      ) : (
        <Text style={styles.permissionText}>
          {permissionStatus === 'undetermined'
            ? 'Permiso para acceder a contactos no concedido.'
            : 'Permiso para acceder a contactos denegado.'}
        </Text>
      )}
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
  noNumber: {
    fontSize: 16,
    color: '#888',
  },
  permissionText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 16,
  },
});

export default ContactListScreen;
