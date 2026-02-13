import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from '@/context/ThemeContext';
import {
  PixelifySans_600SemiBold,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  // ─── HOOKS ───
  const [fontsLoaded] = useFonts({ PixelifySans_600SemiBold });
  const [doneIds, setDoneIds] = useState<number[]>([]); // store marked notifications

  if (!fontsLoaded) return null;

  const notifications = [
    { id: 1, title: "Reminder", message: "Take your medicines" },
    { id: 2, title: "Reminder", message: "Check your sugar level" },
    { id: 3, title: "Reminder", message: "Do your 3-months analysis" },
    { id: 4, title: "Reminder", message: "Tomorrow is your appointment" },
  ];

  const handleMarkDone = (id: number) => {
    if (!doneIds.includes(id)) {
      setDoneIds([...doneIds, id]);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.pixelArrow}>{"<"}</Text>
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.titleLine} />
          </View>
        </View>
      </View>

      {/* NOTIFICATIONS LIST */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((item) => {
          const isDone = doneIds.includes(item.id);
          return (
            <View key={item.id} style={styles.notificationCard}>
              <View style={styles.topRow}>
                <Feather
                  name="bell"
                  size={16}
                  color={COLORS.primary}
                  style={styles.titleIcon}
                />
                <Text style={styles.notificationTitle}>{item.title}</Text>
              </View>

              <Text style={styles.notificationMessage}>{item.message}</Text>

              <TouchableOpacity
                style={[
                  styles.markButton,
                  { backgroundColor: isDone ? "#3A3A6A" : COLORS.markDoneBg },
                ]}
                disabled={isDone}
                onPress={() => handleMarkDone(item.id)}
              >
                <Text style={styles.markButtonText}>
                  {isDone ? "Done" : "Mark as done"}
                </Text>
                <Feather name="check" size={14} color={COLORS.accentText} />
              </TouchableOpacity>
            </View>
          );
        })}

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.primary }]}>Keep tracking your advancement</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 60, paddingBottom: 20 },
  headerRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20 },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20,
    zIndex: 10,
    top: -5,
  },
  pixelArrow: {
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 24,
    color: COLORS.arrowBlue,
  },
  titleContainer: { flex: 1, alignItems: "center" },
  title: {
    fontSize: 28,
    fontFamily: "PixelifySans_600SemiBold",
    marginBottom: 15,
  },
  titleLine: { width: 220, height: 2, backgroundColor: COLORS.lineColor, marginTop: 3, borderRadius: 2 },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  notificationCard: { backgroundColor: COLORS.card, borderRadius: 12, padding: 16, marginBottom: 12 },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  titleIcon: { marginRight: 8 },
  notificationTitle: { fontSize: 16, fontWeight: "600", color: COLORS.textPrimary },
  notificationMessage: { fontSize: 15, color: COLORS.textSecondary, marginBottom: 12, marginLeft: 24 },
  markButton: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginLeft: 24 },
  markButtonText: { fontSize: 12, color: COLORS.accentText, fontWeight: "400", marginRight: 4 },
  footer: { alignItems: "center", paddingVertical: 30 },
  footerText: { textAlign: "center", fontSize: 32, color: COLORS.headerText, fontFamily: "PixelifySans_600SemiBold" },
});
