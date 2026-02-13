import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Svg, { Line, Text as SvgText } from "react-native-svg";


export default function DataScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Glyco<Text style={{ color: "#4DA6FF" }}>Pal</Text></Text>
      <Text style={styles.subtitle}>Blood glucose excursions</Text>

      <View style={styles.filter}>
        <Text style={styles.filterText}>Last 90 days</Text>
      </View>

      <View style={styles.filter}>
        <Text style={styles.filterText}>All meals</Text>
      </View>

      {/* Chart Card */}
      <View style={styles.chartCard}>
        <Svg width="100%" height={260}>
          {/* Grid + values */}
          {[
            { y: 20, value: "600" },
            { y: 60, value: "500" },
            { y: 100, value: "400" },
            { y: 140, value: "300" },
            { y: 180, value: "200" },
            { y: 220, value: "100" },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <Line
                x1="40"
                x2="100%"
                y1={item.y}
                y2={item.y}
                stroke="#3A3A5E"
                strokeWidth="1"
              />
              <SvgText
                x="10"
                y={item.y + 4}
                fill="#8B8BB5"
                fontSize="10"
              >
                {item.value}
              </SvgText>
            </React.Fragment>
          ))}

          {/* Hyperglycemia */}
          <Line
            x1="40"
            x2="100%"
            y1="170"
            y2="170"
            stroke="#FF9F1C"
            strokeDasharray="6 4"
            strokeWidth="1.5"
          />
          <SvgText
            x="45"
            y="165"
            fill="#FF9F1C"
            fontSize="10"
          >
            Hyperglycemia
          </SvgText>

          {/* Hypoglycemia */}
          <Line
            x1="40"
            x2="100%"
            y1="210"
            y2="210"
            stroke="#FF4D4D"
            strokeDasharray="6 4"
            strokeWidth="1.5"
          />
          <SvgText
            x="45"
            y="205"
            fill="#FF4D4D"
            fontSize="10"
          >
            Hypoglycemia
          </SvgText>
        </Svg>
      </View>

      {/* Last value */}
      <View style={styles.resultCard}>
        <Text style={styles.resultValue}>✔ 130 mg/dl</Text>
        <Text style={styles.resultDate}>06-02-2026 08:21</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0823",
    paddingTop: 60,
    paddingRight: 20,
    paddingLeft: 20,
  },
  title: {
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 32,
    color: "#ffffff",
  },
  subtitle: {
    fontFamily: "PixelifySans_600SemiBold",
    color: "#8B8BB5",
    marginBottom: 20,
  },
  filter: {
    backgroundColor: "#2C2C54",
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  filterText: {
    fontFamily: "PixelifySans_600SemiBold",
    color: "#E0E0FF",
  },
  chartCard: {
    backgroundColor: "#1E1A3B",
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
  resultCard: {
    backgroundColor: "#1E1A3B",
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
  resultValue: {
    fontFamily: "PixelifySans_700Bold",
    color: "#7CFF6B",
    fontSize: 18,
  },
  resultDate: {
    fontFamily: "PixelifySans_400Regular",
    color: "#8B8BB5",
    marginTop: 5,
  },
});
