import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';

export const showError = (message) => {
  Alert.alert(
    'Error',
    message,
    [{ text: 'OK' }]
  );
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};
