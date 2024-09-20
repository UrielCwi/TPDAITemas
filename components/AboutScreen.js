import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';

const AboutScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false); // Controla la visibilidad del escáner
  const [scannedData, setScannedData] = useState(''); // Datos escaneados del QR

  // Solicitar permisos para usar la cámara
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Función que se activa cuando se escanea un código QR
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannerVisible(false); // Ocultar el escáner después de escanear
    setScannedData(data); // Guardar los datos escaneados
    setModalVisible(true);
  };

  // Mostrar un mensaje si no se tienen permisos para la cámara
  if (hasPermission === null) {
    return <Text>Solicitando permiso de la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se tienen permisos para acceder a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de la Aplicación</Text>
      <Text>Integrantes: Iván Latascheff y Uriel Cwirenbaum</Text>

      {/* Mostrar tu código QR */}
      <Text style={styles.qrText}>Escanea el siguiente QR para ver los integrantes:</Text>
      
      {/* Generación del QR */}
      <QRCode
        value="Iván Latascheff, Uriel Cwirenbaum" // Asegúrate que sea un string
        size={150}
        backgroundColor="white"
        color="black"
      />

      {/* Botón para escanear */}
      <Button
        title="Escanear otra app"
        onPress={() => {
          setScannerVisible(true); // Mostrar el escáner
          setScanned(false); // Resetear el estado de escaneo
        }}
      />

      {/* Solo renderizar el escáner si scannerVisible es true */}
      {scannerVisible && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 300, width: 300 }}
        />
      )}

      {/* Modal para mostrar el contenido escaneado */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Datos del código QR escaneado:</Text>
            {/* Envolver scannedData dentro de un componente <Text> */}
            <Text>{scannedData}</Text> 
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});