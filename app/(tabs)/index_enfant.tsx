import {
  PixelifySans_600SemiBold,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

export default function HomeEnfantScreen() {
  // Load Pixelify Sans font
  let [fontsLoaded] = useFonts({
    PixelifySans_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; // You can put a loading spinner here if you want
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.smallStarBox}>
            <Ionicons name="star" size={16} color="#FFD84D" />
          </View>
          <View>
            <Text style={styles.title}>
              Glyco<Text style={{ color: "#4DA6FF" }}>Pal</Text>
            </Text>
            <Text style={styles.level}>Level 4</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.themeButton}>
          <Ionicons name="sunny" size={20} color="#4DA6FF" />
        </TouchableOpacity>
      </View>

      {/* BOY CHARACTER */}
      <View style={styles.characterContainer}>
        <Image 
          source={require('../../assets/images/hello.svg')} 
          style={styles.characterImage}
          resizeMode="contain"
        />
      </View>

      {/* LEVEL AND PERCENTAGE */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>Level</Text>
          <Text style={styles.statNumber}>4</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>Progress</Text>
          <Text style={styles.statNumber}>99%</Text>
        </View>
      </View>

      {/* FOUR BUTTONS */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="restaurant-outline" size={24} color="#4DA6FF" />
          <Text style={styles.buttonText}>Meals</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="fitness-outline" size={24} color="#4DA6FF" />
          <Text style={styles.buttonText}>Activity</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="water-outline" size={24} color="#4DA6FF" />
          <Text style={styles.buttonText}>Hydration</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="medkit-outline" size={24} color="#4DA6FF" />
          <Text style={styles.buttonText}>Medicine</Text>
        </TouchableOpacity>
      </View>

      {/* START BUTTON */}
      <TouchableOpacity style={styles.startButton}>
        <Ionicons name="add-circle" size={20} color="black" />
        <Text style={styles.pixelButton}>START LOG</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04082A",
    padding: 20,
  },

  header: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  smallStarBox: {
    backgroundColor: "#11154D",
    padding: 10,
    borderRadius: 12,
  },

  title: {
    fontSize: 22,
    color: "white",
    fontFamily: "PixelifySans_600SemiBold",
  },

  level: {
    color: "#A0A4C0",
    fontFamily: "PixelifySans_600SemiBold",
    marginTop: 4,
  },

  themeButton: {
    backgroundColor: "#11154d",
    padding: 12,
    borderRadius: 30,
  },

  characterContainer: {
    alignItems: "center",
    marginVertical: 30,
    height: 200,
  },

  characterImage: {
    width: 150,
    height: 150,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },

  statBox: {
    backgroundColor: "#1A1F5A",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    minWidth: 100,
  },

  statValue: {
    color: "#B8C1FF",
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 14,
    marginBottom: 5,
  },

  statNumber: {
    color: "#4DA6FF",
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 24,
  },

  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 30,
  },

  actionButton: {
    backgroundColor: "#1A1F5A",
    width: "48%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "#4DA6FF",
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 16,
    marginTop: 8,
  },

  startButton: {
    marginTop: 20,
    backgroundColor: "#E6D98D",
    padding: 22,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  pixelButton: {
    fontSize: 18,
    fontFamily: "PixelifySans_600SemiBold",
    fontWeight: "bold",
  },
});