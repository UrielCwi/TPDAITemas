import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const EmergencyNumberScreen = () => {
  const [emergencyNumbers, setEmergencyNumbers] = useState([]);
  const [inputNumber, setInputNumber] = useState('');

  useEffect(() => {
    const fetchEmergencyNumbers = async () => {
      try {
        const storedNumbers = await SecureStore.getItemAsync('emergencyNumbers');
        if (storedNumbers) {
          setEmergencyNumbers(JSON.parse(storedNumbers));
        }
      } catch (error) {
        console.error('Error fetching emergency numbers:', error);
      }
    };

    fetchEmergencyNumbers();
  }, []);

  const saveEmergencyNumber = async () => {
    const formattedNumber = formatPhoneNumber(inputNumber);
    const updatedNumbers = [...emergencyNumbers, formattedNumber];
    try {
      await SecureStore.setItemAsync('emergencyNumbers', JSON.stringify(updatedNumbers));
      setEmergencyNumbers(updatedNumbers);
      setInputNumber('');
      Alert.alert('Número de emergencia guardado', `El número ${formattedNumber} ha sido guardado.`);
    } catch (error) {
      console.error('Error saving emergency number:', error);
      Alert.alert('Error', 'No se pudo guardar el número de emergencia.');
    }
  };

  const formatPhoneNumber = (number) => {
    return number.replace(/\D/g, '');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Número de teléfono de emergencia:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el número de teléfono"
        keyboardType="phone-pad"
        value={inputNumber}
        onChangeText={setInputNumber}
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
  numberList: {
    marginTop: 16,
  },
  numberItem: {
    fontSize: 16,
    color: '#333',
  },
});

export default EmergencyNumberScreen;
