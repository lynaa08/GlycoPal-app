import { useTheme } from '@/context/ThemeContext';
import {
  PixelifySans_600SemiBold,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Line } from "react-native-svg";

export default function HomeScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();

  // Load Pixelify Sans font
  let [fontsLoaded] = useFonts({
    PixelifySans_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.smallStarBox, { backgroundColor: colors.card }]}>
            <Ionicons name="star" size={16} color="#FFD84D" />
          </View>
          <View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Glyco<Text style={{ color: colors.accent }}>Pal</Text>
            </Text>
            <Text style={[styles.level, { color: colors.textSecondary }]}>Level 4</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.themeButton, { backgroundColor: colors.secondary }]} onPress={toggleTheme}>
          <Ionicons name={isDarkMode ? "sunny" : "moon"} size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* CONSTELLATION CARD */}
      <View style={[styles.card, { backgroundColor: colors.secondary }]}>
        <View style={styles.constellationContainer}>
          <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
            {/* Yellow chain */}
            <Line
              x1="40"
              y1="135"
              x2="90"
              y2="115"
              stroke="#8C92D9"
              strokeWidth="1.5"
              strokeDasharray="3,4"
            />
            <Line
              x1="90"
              y1="115"
              x2="140"
              y2="150"
              stroke="#8C92D9"
              strokeWidth="1.5"
              strokeDasharray="3,4"
            />
            <Line
              x1="140"
              y1="150"
              x2="185"
              y2="110"
              stroke="#8C92D9"
              strokeWidth="1.5"
              strokeDasharray="3,4"
            />
            <Line
              x1="185"
              y1="110"
              x2="220"
              y2="125"
              stroke="#8C92D9"
              strokeWidth="1.5"
              strokeDasharray="3,4"
            />
            {/* Yellow → First Grey */}
            <Line
              x1="220"
              y1="125"
              x2="255"
              y2="110"
              stroke="#8C92D9"
              strokeWidth="1.5"
              strokeDasharray="3,4"
            />
            {/* First Grey → Last Grey */}
            <Line
              x1="255"
              y1="110"
              x2="285"
              y2="95"
              stroke="#8C92D9"
              strokeWidth="1.5"
              strokeDasharray="3,4"
            />
            {/* Last Grey → Moon */}
            <Line
              x1={285 - 10}
              y1={95}
              x2={315 - 10}
              y2={60}
              stroke="#8C92D9"
              strokeWidth="1.5"
              strokeDasharray="3,4"
            />
          </Svg>

          {/* ⭐ Yellow Stars */}
          <View style={[styles.starSmall, { left: 40, top: 135 }]} />
          <View style={[styles.starSmall, { left: 90, top: 115 }]} />
          <View style={[styles.starLarge, { left: 140, top: 150 }]} />
          <View style={[styles.starSmall, { left: 185, top: 110 }]} />
          <View style={[styles.starSmall, { left: 220, top: 125 }]} />

          {/* ▫️ First Grey */}
          <View style={[styles.starGreySmall, { left: 255, top: 110 }]} />

          {/* ▫️ Last Grey (LEFT of Moon) */}
          <View style={[styles.starGreySmall, { left: 285, top: 95 }]} />

          {/* 🌙 Moon */}
          <View style={styles.moon} />
        </View>

        <View style={[styles.constellationLabel, { backgroundColor: colors.secondary }]}>
          <Text style={styles.pixelSmall}>THE BIG DIPPER</Text>
        </View>
      </View>

      {/* STARS COUNT */}
      <View style={styles.starsSection}>
        <Text style={[styles.pixelBig, { color: colors.accent }]}>12 Stars</Text>
        <Text style={styles.pixelSmall}>TOTAL FOUND</Text>
      </View>

      {/* LOCKED CARD */}
      <View style={[styles.lockedCard, { backgroundColor: colors.card }]}>
        <Ionicons name="lock-closed-outline" size={26} color={colors.textPrimary} />
        <Text style={[styles.pixelDark, { color: colors.textPrimary }]}>Continue to unlock it</Text>
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
    padding: 10,
    borderRadius: 50,
  },

  card: {
    backgroundColor: "#1A1F5A",
    height: 250,
    borderRadius: 25,
    marginTop: 30,
    padding: 20,
    justifyContent: "space-between",
  },

  constellationContainer: {
    flex: 1,
    position: "relative",
  },

  starSmall: {
    position: "absolute",
    width: 16,
    height: 16,
    backgroundColor: "#FFD84D",
    borderRadius: 4,
    shadowColor: "#FFD84D",
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },

  starLarge: {
    position: "absolute",
    width: 24,
    height: 24,
    backgroundColor: "#FFD84D",
    borderRadius: 6,
    shadowColor: "#FFD84D",
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 18,
  },

  starGreySmall: {
    position: "absolute",
    width: 14,
    height: 14,
    backgroundColor: "#6E74A6",
    borderRadius: 4,
    opacity: 0.7,
  },

  moon: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E6E6E6",
    top: 25,
    left: 245,
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },

  constellationLabel: {
    alignSelf: "center",
    backgroundColor: "#413D67",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 40,
    justifyContent: "space-between",
    top: 45,
  },

  starsSection: {
    alignItems: "center",
    marginTop: 30,
  },

  lockedCard: {
    backgroundColor: "#5A6AB0",
    marginTop: 30,
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
  },

  startButton: {
    marginTop: 30,
    backgroundColor: "#dba541ff",
    padding: 22,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  /* PIXEL TEXT */
  pixelBig: {
    fontSize: 38,
    color: "#4DA6FF",
    fontFamily: "PixelifySans_600SemiBold",
  },

  pixelSmall: {
    fontSize: 12,
    color: "#B8C1FF",
    fontFamily: "PixelifySans_600SemiBold",
    letterSpacing: 2,
  },

  pixelDark: {
    marginTop: 10,
    color: "#0B0F3A",
    fontFamily: "PixelifySans_600SemiBold",
  },

  pixelButton: {
    fontSize: 18,
    fontFamily: "PixelifySans_600SemiBold",
    fontWeight: "bold",
  },
});