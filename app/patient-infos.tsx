import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function PatientInfosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Patient Information Page</Text>
      <Text style={styles.subPlaceholder}>This is where patient details will be collected</Text>
      
      {/* Next button that takes you to index (main tabs) */}
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
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
  placeholder: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 10,
  },
  subPlaceholder: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: '#2D5A27',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});