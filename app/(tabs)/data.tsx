import {
  PixelifySans_400Regular,
  PixelifySans_600SemiBold,
  PixelifySans_700Bold,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const timeRanges = ["15 days", "30 days", "60 days", "90 days"];
const mealTypes = ["All meals", "Breakfast", "Lunch", "Snack", "Dinner"];

// Sample glucose data for demonstration
const glucoseData = [
  { value: 120, isHyper: false },
  { value: 180, isHyper: false },
  { value: 140, isHyper: false },
  { value: 160, isHyper: false },
  { value: 190, isHyper: false },
  { value: 220, isHyper: true },
  { value: 150, isHyper: false },
  { value: 130, isHyper: false },
];

export default function DataVisualizationScreen() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last 90 days");
  const [selectedMeal, setSelectedMeal] = useState("All meals");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showMealDropdown, setShowMealDropdown] = useState(false);

  const [fontsLoaded] = useFonts({
    PixelifySans_400Regular,
    PixelifySans_600SemiBold,
    PixelifySans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const maxValue = 600;
  const hyperThreshold = 200;
  const hypoThreshold = 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Glyco<Text style={styles.titleBlue}>Pal</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.themeButton}>
          <Ionicons name="sunny" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Subtitle */}
        <Text style={styles.subtitle}>Blood glucose excursions</Text>

        {/* Filters Row */}
        <View style={styles.filtersRow}>
          {/* Time Range Dropdown */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowTimeDropdown(!showTimeDropdown);
                setShowMealDropdown(false);
              }}
            >
              <Text style={styles.dropdownText}>{selectedTimeRange}</Text>
              <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
            </TouchableOpacity>

            {showTimeDropdown && (
              <View style={styles.dropdownMenu}>
                {timeRanges.map((range) => (
                  <TouchableOpacity
                    key={range}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedTimeRange(`Last ${range}`);
                      setShowTimeDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedTimeRange === `Last ${range}` && styles.selectedItem,
                      ]}
                    >
                      {range}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Meal Type Dropdown */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowMealDropdown(!showMealDropdown);
                setShowTimeDropdown(false);
              }}
            >
              <Text style={styles.dropdownText}>{selectedMeal}</Text>
              <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
            </TouchableOpacity>

            {showMealDropdown && (
              <View style={styles.dropdownMenu}>
                {mealTypes.map((meal) => (
                  <TouchableOpacity
                    key={meal}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedMeal(meal);
                      setShowMealDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedMeal === meal && styles.selectedItem,
                      ]}
                    >
                      {meal}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Chart Container */}
        <View style={styles.chartCard}>
          {/* Y-axis labels */}
          <View style={styles.yAxisContainer}>
            {[600, 500, 400, 300, 200, 100, 0].map((value, index) => (
              <View key={value} style={styles.yAxisLabel}>
                <Text style={styles.yAxisText}>{value}.</Text>
              </View>
            ))}
          </View>

          {/* Chart Area */}
          <View style={styles.chartArea}>
            {/* Grid Lines */}
            <View style={styles.gridContainer}>
              {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                <View key={index} style={styles.gridLine} />
              ))}
            </View>

            {/* Hyperglycemia Lines */}
            <View style={[styles.hyperLine, { bottom: `${(hyperThreshold / maxValue) * 100}%` }]}>
              <Text style={styles.hyperText}>Hyperglycemia</Text>
            </View>
            <View style={[styles.hypoLine, { bottom: `${(hypoThreshold / maxValue) * 100}%` }]}>
              <Text style={styles.hypoText}>Hypoglycemia</Text>
            </View>

            {/* Data Points */}
            <View style={styles.dataPointsContainer}>
              {glucoseData.map((data, index) => {
                const bottom = (data.value / maxValue) * 100;
                return (
                  <View
                    key={index}
                    style={[
                      styles.dataPoint,
                      {
                        bottom: `${bottom}%`,
                        left: `${(index / (glucoseData.length - 1)) * 90 + 5}%`,
                      },
                    ]}
                  />
                );
              })}
            </View>
          </View>
        </View>

        {/* Latest Reading Card */}
        <View style={styles.readingCard}>
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={32} color="#8BC34A" />
          </View>
          <View style={styles.readingInfo}>
            <Text style={styles.readingValue}>130 mg / dl</Text>
            <Text style={styles.readingDate}>08-02-2026 08:21</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04082A",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    color: "#FFFFFF",
    fontFamily: "PixelifySans_700Bold",
  },
  titleBlue: {
    color: "#4DA6FF",
  },
  themeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1A1F5A",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#B8C1FF",
    fontFamily: "PixelifySans_400Regular",
    marginBottom: 20,
  },
  filtersRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 30,
    zIndex: 1000,
  },
  dropdownContainer: {
    flex: 1,
    position: "relative",
  },
  dropdown: {
    backgroundColor: "#4C5EA2",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "PixelifySans_400Regular",
  },
  dropdownMenu: {
    position: "absolute",
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: "#1A1F5A",
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 2000,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    color: "#B8C1FF",
    fontSize: 14,
    fontFamily: "PixelifySans_400Regular",
  },
  selectedItem: {
    color: "#4DA6FF",
    fontFamily: "PixelifySans_600SemiBold",
  },
  chartCard: {
    backgroundColor: "#1A1F5A",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    flexDirection: "row",
    minHeight: 280,
  },
  yAxisContainer: {
    width: 50,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  yAxisLabel: {
    height: 30,
    justifyContent: "center",
  },
  yAxisText: {
    color: "#B8C1FF",
    fontSize: 12,
    fontFamily: "PixelifySans_400Regular",
  },
  chartArea: {
    flex: 1,
    height: 250,
    position: "relative",
  },
  gridContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  gridLine: {
    height: 1,
    backgroundColor: "#2A2F6A",
    width: "100%",
  }, 
  hyperLine: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#f72a2a",
    borderStyle: "dashed",
  },
  hyperText: {
    position: "absolute",
    left: 10,
    top: -20,
    color: "#f72a2a",
    fontSize: 10,
    fontFamily: "PixelifySans_400Regular",
  },
  hypoLine: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#FF8C42",
    borderStyle: "dashed",
  },
  hypoText: {
    position: "absolute",
    left: 10,
    top: 5,
    color: "#FF8C42",
    fontSize: 10,
    fontFamily: "PixelifySans_400Regular",
  },
  dataPointsContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    bottom: 10,
  },
  dataPoint: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4DA6FF",
  },
  readingCard: {
    backgroundColor: "#1A1F5A",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  checkmark: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#8BC34A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  readingInfo: {
    flex: 1,
  },
  readingValue: {
    fontSize: 24,
    color: "#8BC34A",
    fontFamily: "PixelifySans_700Bold",
    marginBottom: 4,
  },
  readingDate: {
    fontSize: 14,
    color: "#B8C1FF",
    fontFamily: "PixelifySans_400Regular",
  },
});