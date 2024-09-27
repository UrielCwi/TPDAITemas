import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';

// Función para mostrar alertas y hacer vibrar el dispositivo
export const showError = (message) => {
  // Mostrar un mensaje de alerta
  Alert.alert(
    'Error',
    message,
    [{ text: 'OK' }]
  );

  // Hacer vibrar el dispositivo
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};
