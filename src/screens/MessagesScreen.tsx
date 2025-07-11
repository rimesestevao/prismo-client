import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessagesScreen = () => {
  const handleButtonPress = (buttonName: string) => {
    console.log(`Botão ${buttonName} pressionado`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      
      <View style={styles.grid}>
        {/* Primeira linha */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress('Terminal')}
          activeOpacity={0.8}
        >
          <Ionicons name="terminal" size={60} color="white" />
          <Text style={styles.buttonText}>Terminal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress('Microfone')}
          activeOpacity={0.8}
        >
          <Ionicons name="mic" size={60} color="white" />
          <Text style={styles.buttonText}>Microfone</Text>
        </TouchableOpacity>
        
        {/* Segunda linha */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress('Calendário')}
          activeOpacity={0.8}
        >
          <Ionicons name="calendar" size={60} color="white" />
          <Text style={styles.buttonText}>Calendário</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleButtonPress('Robô')}
          activeOpacity={0.8}
        >
          <Ionicons name="hardware-chip" size={60} color="white" />
          <Text style={styles.buttonText}>Robô</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34C759',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '48%',
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
});

export default MessagesScreen;
