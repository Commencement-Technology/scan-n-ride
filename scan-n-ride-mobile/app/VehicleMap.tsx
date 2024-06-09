import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Vehicle {
  id: number;
  line: string;
  vehicleNumber: string;
  position: {
    latitude: number;
    longitude: number;
  };
}

const VehicleMap: React.FC = () => {
  const [vehiclePositions, setVehiclePositions] = useState<Vehicle[]>([]);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [allLines, setAllLines] = useState<string[]>([]);

  useEffect(() => {
    // Pobierz dane o wszystkich liniach z API
    fetch('https://z2qbov0z12.execute-api.eu-central-1.amazonaws.com/vehicle/lines')
      .then(response => response.json())
      .then(data => setAllLines(data))
      .catch(error => console.error('Error fetching lines:', error));
  }, []);

  const fetchVehiclePositions = (line: string) => {
    fetch(`https://z2qbov0z12.execute-api.eu-central-1.amazonaws.com/vehicle?lines=${line}`)
      .then(response => response.json())
      .then(data => setVehiclePositions(data))
      .catch(error => console.error('Error fetching vehicle positions:', error));
  };

  const handleLinePress = (line: string) => {
    setSelectedLine(line);
    fetchVehiclePositions(line);
  };

  const getButtonStyle = (line: string) => ({
    backgroundColor: selectedLine === line ? '#007bff' : '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  });

  const getTextColor = (line: string) => ({
    color: selectedLine === line ? '#ffffff' : '#000000',
  });

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 51.1079,
          longitude: 17.0385,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {vehiclePositions.map(vehicle => (
          <Marker
            key={vehicle.id}
            coordinate={vehicle.position}
            title={`Numer pojazdu: ${vehicle.vehicleNumber}`}
            description={`Linia: ${vehicle.line}`}
          />
        ))}
      </MapView>
      <View style={{height: 40}} >

      <ScrollView horizontal >
  {allLines.map((line, index) => (
    <TouchableOpacity
      key={index}
      style={[getButtonStyle(line), { marginHorizontal: 5 }]}
      onPress={() => handleLinePress(line)}
    >
      <Text style={getTextColor(line)}>{line}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>
</View>

    </View>
  );
};

export default VehicleMap;
