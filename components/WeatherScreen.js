import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { showError } from '../components/errorHelper';  

const WeatherScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la ubicación denegado');
        showError('Permission denied for location access.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      const API_KEY = '1f583ba0bb69de4aef90c227be6e63dd';
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

      axios.get(weatherURL)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          showError('Error fetching weather data.');
        });
    }
  }, [location]);

  let text = 'Esperando ubicación...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitud: ${location.coords.latitude}, Longitud: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        Hora actual: {currentTime.toLocaleTimeString()}
      </Text>
      <Text style={styles.date}>
        Fecha: {currentTime.toLocaleDateString()}
      </Text>
      <Text style={styles.location}>{text}</Text>
      
      {weatherData ? (
        <View>
          <Text style={styles.weather}>
            Temperatura: {weatherData.main.temp}°C
          </Text>
          <Text style={styles.weather}>
            Clima: {weatherData.weather[0].description}
          </Text>
        </View>
      ) : (
        <Text>Cargando datos del clima...</Text>
      )}
    </View>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
  },
  weather: {
    fontSize: 18,
    marginTop: 10,
  },
});
