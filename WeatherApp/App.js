import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:3000/weather?city=${city}`);
      setWeather(response.data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Weather App</Text>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.button} onPress={fetchWeather}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        
        {error && <Text style={styles.error}>{error}</Text>}
        
        {weather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.cityName}>{weather.name}</Text>
            <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
            <Text style={styles.description}>{weather.weather[0].description}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detail}>Humidity: {weather.main.humidity}%</Text>
              <Text style={styles.detail}>Wind: {weather.wind.speed} m/s</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textTransform: 'capitalize',
    marginBottom: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  detail: {
    fontSize: 16,
    color: '#666',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default App; 