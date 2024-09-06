import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const EmergencyNumberScreen = () => {
  const [emergencyNumber, setEmergencyNumber] = useState('');

  useEffect(() => {
    const fetchEmergencyNumber = async () => {
      try {
        const storedNumber = await SecureStore.getItemAsync('emergencyNumber');
        if (storedNumber) {
          setEmergencyNumber(storedNumber);
        }
      } catch (error) {
        console.error('Error fetching emergency number:', error);
      }
    };

    fetchEmergencyNumber();
  }, []);

  const saveEmergencyNumber = async () => {
    if (validatePhoneNumber(emergencyNumber)) {
      try {
        await SecureStore.setItemAsync('emergencyNumber', emergencyNumber);
        Alert.alert('Número de emergencia guardado', `El número ${emergencyNumber} ha sido guardado.`);
      } catch (error) {
        console.error('Error saving emergency number:', error);
        Alert.alert('Error', 'No se pudo guardar el número de emergencia.');
      }
    } else {
      Alert.alert('Número inválido', 'Por favor ingrese un número de teléfono válido.');
    }
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+54 9 \d{2} \d{4} \d{4}$/;
    return phoneRegex.test(number);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Número de teléfono de emergencia:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el número de teléfono"
        keyboardType="phone-pad"
        value={emergencyNumber}
        onChangeText={setEmergencyNumber}
      />
      <Button title="Guardar Número" onPress={saveEmergencyNumber} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default EmergencyNumberScreen;
