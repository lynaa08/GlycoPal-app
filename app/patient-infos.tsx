import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function PatientInfosScreen() {
  const [userType, setUserType] = useState<'adult' | 'child' | null>(null);

  const handleUserTypeSelection = async (type: 'adult' | 'child') => {
    setUserType(type);
    try {
      await AsyncStorage.setItem('userType', type);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving user type:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select User Type</Text>
      <Text style={styles.subtitle}>Who will be using this app?</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[
            styles.optionButton, 
            userType === 'adult' && styles.selectedButton
          ]}
          onPress={() => handleUserTypeSelection('adult')}
        >
          <Text style={[
            styles.optionText,
            userType === 'adult' && styles.selectedText
          ]}>Adult</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.optionButton, 
            userType === 'child' && styles.selectedButton
          ]}
          onPress={() => handleUserTypeSelection('child')}
        >
          <Text style={[
            styles.optionText,
            userType === 'child' && styles.selectedText
          ]}>Child</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  optionsContainer: {
    width: '100%',
    gap: 20,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedButton: {
    backgroundColor: '#2D5A27',
    borderColor: '#2D5A27',
  },
  optionText: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
});