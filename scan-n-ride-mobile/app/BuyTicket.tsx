import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const BuyTicketScreen = () => {
  const [lines, setLines] = useState([]);
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  useEffect(() => {
    fetch('https://z2qbov0z12.execute-api.eu-central-1.amazonaws.com/vehicle/lines')
      .then(response => response.json())
      .then(data => setLines(data))
      .catch(error => console.error('Error fetching lines:', error));
  }, []);

  const availableTicketTypes = ['20-minutowy', '60-minutowy', '6-godzinny', '24-godzinny', 'Single' ];

  const handleBuyTicket = () => {
    console.log('Kupiono bilet:');
    console.log('Linia:', selectedLine);
    console.log('Typ biletu:', selectedTicketType);
    console.log('Numer pojazdu:', vehicleNumber);
    setSelectedLine('');
    setSelectedTicketType('');
    setVehicleNumber('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Wybierz linię:</Text>
      <View style={styles.inputContainer}>
        {lines.map(line => (
          <TouchableOpacity
            key={line}
            style={[styles.optionButton, selectedLine === line && styles.selectedOption]}
            onPress={() => setSelectedLine(line)}
          >
            <Text>{line}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Wybierz typ biletu:</Text>
      <View style={styles.inputContainer}>
        {availableTicketTypes.map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.optionButton, selectedTicketType === type && styles.selectedOption]}
            onPress={() => setSelectedTicketType(type)}
          >
            <Text>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Podaj numer pojazdu:</Text>
      <TextInput
        style={styles.input}
        placeholder="Numer pojazdu"
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
      />

      <TouchableOpacity style={styles.buyButton} onPress={handleBuyTicket}>
        <Text style={styles.buyButtonText}>Kup bilet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  selectedOption: {
    backgroundColor: '#007bff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BuyTicketScreen;
