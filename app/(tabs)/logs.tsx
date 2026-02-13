import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [selectedRange, setSelectedRange] = useState('90 days');
  const [showDropdown, setShowDropdown] = useState(false);

  const ranges = ['15 days', '30 days', '60 days', '90 days'];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header */}
      <View style={styles.header}>

        <Text style={styles.logo}>
          Glyco<Text style={{ color: colors.accent }}>Pal</Text>
        </Text>

        <TouchableOpacity style={[styles.themeButton, { backgroundColor: colors.secondary }]} onPress={toggleTheme}>
          <Ionicons name={isDarkMode ? "sunny" : "moon"} size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Appointment Card - Split Design */}
      <View style={styles.appointmentContainer}>
        <View style={[styles.appointmentHeader, { backgroundColor: colors.cardHeader }]}>
          <Text style={styles.appointmentTitle}>Your next appointment</Text>
        </View>
        <View style={[styles.appointmentBody, { backgroundColor: colors.cardBody }]}>
          <Text style={styles.appointmentSubtitle}>No appointment scheduled</Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.row}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statTitle, { color: colors.primary }]}>Last blood glucose reading</Text>
          <Text style={[styles.statValue, { color: colors.success }]}>130</Text>
          <Text style={[styles.unit, { color: colors.success }]}>mg / dl</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statTitle, { color: colors.primary }]}>
            Average of the last 90 days
          </Text>
          <Text style={[styles.statValue, { color: colors.success }]}>130</Text>
          <Text style={[styles.unit, { color: colors.success }]}>mg / dl</Text>
        </View>
      </View>

      {/* HbA1c */}
      <View style={[styles.hba1cCard, { backgroundColor: colors.card }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.hba1cTitle, { color: colors.primary }]}>Estimated HbA1c</Text>
          <Text style={[styles.hba1cSub, { color: colors.primary }]}>
            Estimation based on average blood glucose readings over the past 90 days
          </Text>
        </View>

        <View style={[styles.badge, { borderColor: colors.success }]}>
          <Text style={{ color: colors.success, fontFamily: "PixelifySans_400Regular" }}>
            6.2%
          </Text>
        </View>
      </View>

      {/* Measures Summary */}
      <Text style={[styles.sectionTitle, { color: colors.primary }]}>Measures summary</Text>

      {/* Date Range Dropdown */}
      <View style={{ zIndex: 1000, alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity
          style={[styles.dropdownButton, { backgroundColor: colors.info }]}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownButtonText}>Last {selectedRange}</Text>
          {/* <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={16} color="white" /> */}
        </TouchableOpacity>

        {showDropdown && (
          <View style={[styles.dropdownList, { backgroundColor: colors.info }]}>
            {ranges.map((range) => (
              <TouchableOpacity
                key={range}
                style={[styles.dropdownItem]}
                onPress={() => {
                  setSelectedRange(range);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{range}</Text>
                {selectedRange === range && <Ionicons name="checkmark" size={16} color="white" />}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Summary Grid */}
      <View style={[styles.row, { zIndex: -1 }]}>
        {/* Measures Count */}
        <View style={[styles.summaryCard, { backgroundColor: colors.info, width: '32%' }]}>
          <Text style={styles.summaryLabel}>Measures</Text>
          <Text style={styles.bigNumber}>1</Text>
        </View>

        {/* Lowest / Highest Split Card */}
        <View style={[styles.splitCard, { backgroundColor: colors.card, width: '65%' }]}>
          <View style={styles.splitHalf}>
            <Text style={[styles.splitLabel, { color: colors.danger }]}>Lowest</Text>
            <Text style={[styles.splitValue, { color: colors.danger }]}>130</Text>
            <Text style={[styles.splitUnit, { color: colors.danger }]}>mg / dl</Text>
          </View>
          <View style={[styles.verticalDivider, { backgroundColor: colors.info }]} />
          <View style={styles.splitHalf}>
            <Text style={[styles.splitLabel, { color: colors.warning }]}>Highest</Text>
            <Text style={[styles.splitValue, { color: colors.warning }]}>130</Text>
            <Text style={[styles.splitUnit, { color: colors.warning }]}>mg / dl</Text>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.smallCard, { backgroundColor: colors.success }]}>
          <Text style={styles.smallCardText}>In range</Text>
          <View style={styles.valueRow}>
            <Text style={styles.smallNumber}>1</Text>
            <Ionicons name="checkmark" size={18} color="white" />
          </View>
        </View>

        <View style={[styles.smallCard, { backgroundColor: colors.danger }]}>
          <Text style={styles.smallCardText}>Hypos</Text>
          <View style={styles.valueRow}>
            <Text style={styles.smallNumber}>0</Text>
            <Ionicons name="arrow-down" size={18} color="white" />
          </View>
        </View>

        <View style={[styles.smallCard, { backgroundColor: colors.warning }]}>
          <Text style={styles.smallCardText}>Hypers</Text>
          <View style={styles.valueRow}>
            <Text style={styles.smallNumber}>0</Text>
            <Ionicons name="arrow-up" size={18} color="white" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingRight: 20,
    paddingLeft: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  logo: {
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 32,
    color: "white", // Or dynamic if needed, but usually logo is white/accent
  },
  themeButton: {
    padding: 10,
    borderRadius: 50,
  },

  // Appointment Card
  appointmentContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  appointmentHeader: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentBody: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentTitle: {
    color: "white",
    fontSize: 16,
    fontFamily: "PixelifySans_600SemiBold",
  },
  appointmentSubtitle: {
    color: "white",
    fontFamily: "PixelifySans_400Regular",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  // Stats Cards
  statCard: {
    width: "48%",
    padding: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
    minHeight: 140,
  },
  statTitle: {
    fontFamily: "PixelifySans_400Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  statValue: {
    fontSize: 32,
    fontFamily: "PixelifySans_600SemiBold",
    marginTop: 10,
    textAlign: 'center',
  },
  unit: {
    fontFamily: "PixelifySans_400Regular",
    textAlign: 'center',
    fontSize: 14,
  },

  // HbA1c Card
  hba1cCard: {
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  hba1cTitle: {
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 18,
    marginBottom: 5,
  },
  hba1cSub: {
    fontSize: 12,
    fontFamily: "PixelifySans_400Regular",
    lineHeight: 16,
    marginRight: 10,
  },
  badge: {
    fontFamily: "PixelifySans_600SemiBold",
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 24,
    fontFamily: "PixelifySans_600SemiBold",
    marginBottom: 15,
    textAlign: 'center', // Centered in screenshot? Or left? Let's center to match "Measures summary"
  },

  // Date Range Dropdown
  dropdownButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  dropdownButtonText: {
    color: 'white',
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 18,
  },
  dropdownList: {
    position: 'absolute',
    top: 50,
    width: 200,
    borderRadius: 15,
    padding: 10,
    zIndex: 2000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  dropdownItemText: {
    color: 'white',
    fontFamily: "PixelifySans_400Regular",
    fontSize: 16,
  },

  // Summary Grid
  summaryCard: {
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    color: 'white',
    fontFamily: "PixelifySans_400Regular",
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  bigNumber: {
    fontSize: 32,
    color: "white",
    fontFamily: "PixelifySans_600SemiBold",
  },

  // Split Card
  splitCard: {
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 15,
  },
  splitHalf: {
    alignItems: 'center',
    flex: 1,
  },
  verticalDivider: {
    width: 2,
    height: '60%',
    borderRadius: 1,
  },
  splitLabel: {
    fontFamily: "PixelifySans_400Regular",
    fontSize: 12,
    marginBottom: 5,
  },
  splitValue: {
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 24,
  },
  splitUnit: {
    fontFamily: "PixelifySans_400Regular",
    fontSize: 10,
  },

  // Small Colored Cards
  smallCard: {
    width: "30%",
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: 'center',
  },
  smallCardText: {
    fontFamily: "PixelifySans_400Regular",
    color: "white",
    fontSize: 12,
    marginBottom: 5,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  smallNumber: {
    color: "white",
    fontSize: 32,
    fontFamily: "PixelifySans_600SemiBold",
  },
});
