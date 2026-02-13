import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity 
      style={[
        styles.button,
        { backgroundColor: isDarkMode ? '#4CAF50' : '#2D5A27' }
      ]} 
      onPress={toggleTheme}
    >
      <Text style={styles.text}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    margin: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});