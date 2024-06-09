import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const PurchaseScreen = () => {
  const [line, setLine] = useState('');
  const [quantity, setQuantity] = useState('');

  const handlePurchase = () => {
    // Logic to handle ticket purchase
    alert(`Zakupiono ${quantity} bilet(ów) na linię ${line}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Linia"
        value={line}
        onChangeText={text => setLine(text)}
        style={styles.input}
      />
      <TextInput
        label="Ilość"
        value={quantity}
        onChangeText={text => setQuantity(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handlePurchase}>
        Kup Bilet
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
});

export default PurchaseScreen;
