import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

export default function Home() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          Glyco<Text style={{ color: Colors.primary }}>Pal</Text>
        </Text>

        <View style={styles.settingsBtn}>
          <Ionicons name="settings-outline" size={22} color="white" />
        </View>
      </View>

      {/* Appointment */}
      <View style={styles.appointmentCard}>
        <Text style={styles.appointmentTitle}>
          Your next appointment
        </Text>
        <Text style={styles.appointmentSubtitle}>
          No appointment scheduled
        </Text>
      </View>

      {/* Stats Row */}
      <View style={styles.row}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Last blood glucose reading</Text>
          <Text style={styles.statValue}>130</Text>
          <Text style={styles.unit}>mg / dl</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>
            Average of the last 90 days
          </Text>
          <Text style={styles.statValue}>130</Text>
          <Text style={styles.unit}>mg / dl</Text>
        </View>
      </View>

      {/* HbA1c */}
      <View style={styles.hba1cCard}>
        <View>
          <Text style={styles.hba1cTitle}>Estimated HbA1c</Text>
          <Text style={styles.hba1cSub}>
            Estimation based on average blood glucose
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={{ color: Colors.green, fontWeight: "bold" }}>
            6.2%
          </Text>
        </View>
      </View>

      {/* Measures Summary */}
      <Text style={styles.sectionTitle}>Measures summary</Text>

      <View style={styles.summaryCard}>
        <Text style={{ color: Colors.subText }}>Measures</Text>
        <Text style={styles.bigNumber}>1</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.smallCard, { backgroundColor: Colors.green }]}>
          <Text style={styles.smallCardText}>In range</Text>
          <Text style={styles.smallNumber}>1 ✓</Text>
        </View>

        <View style={[styles.smallCard, { backgroundColor: Colors.red }]}>
          <Text style={styles.smallCardText}>Hypos</Text>
          <Text style={styles.smallNumber}>0 ↓</Text>
        </View>

        <View style={[styles.smallCard, { backgroundColor: Colors.orange }]}>
          <Text style={styles.smallCardText}>Hypers</Text>
          <Text style={styles.smallNumber}>0 ↑</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },

  settingsBtn: {
    backgroundColor: Colors.card,
    padding: 10,
    borderRadius: 50,
  },

  appointmentCard: {
    backgroundColor: Colors.lightCard,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  appointmentTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  appointmentSubtitle: {
    color: Colors.subText,
    marginTop: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    backgroundColor: Colors.card,
    width: "48%",
    padding: 15,
    borderRadius: 20,
  },

  statTitle: {
    color: Colors.subText,
    fontSize: 12,
  },

  statValue: {
    fontSize: 30,
    color: Colors.green,
    marginTop: 10,
  },

  unit: {
    color: Colors.subText,
  },

  hba1cCard: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  hba1cTitle: {
    color: "white",
    fontWeight: "bold",
  },

  hba1cSub: {
    color: Colors.subText,
    fontSize: 12,
  },

  badge: {
    borderColor: Colors.green,
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 15,
  },

  summaryCard: {
    backgroundColor: Colors.lightCard,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  bigNumber: {
    fontSize: 28,
    color: "white",
    marginTop: 5,
  },

  smallCard: {
    width: "30%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  smallCardText: {
    color: "white",
    fontSize: 12,
  },

  smallNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
});