import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
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

  const [fontsLoaded] = useFonts({
    PixelifySans_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const notifications = [
    { id: 1, title: "Reminder", message: "Take your medicines" },
    { id: 2, title: "Reminder", message: "Check your sugar level" },
    { id: 3, title: "Reminder", message: "Do your 3-months analysis" },
    { id: 4, title: "Reminder", message: "Tomorrow is your appointment" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        {/* Row with arrow + title */}
        <View style={styles.headerRow}>
          {/* Back Button */}
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.background }]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>
              <Text style={[styles.pixelArrow, { color: isDarkMode ? colors.textSecondary : colors.textPrimary }]}>{"<"}</Text>
            </Text>
          </TouchableOpacity>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.primary }]}>Notifications</Text>
            {/* Ligne */}
            <View style={[styles.titleLine, { backgroundColor: colors.border }]} />
          </View>
        </View>
      </View>

      {/* Notifications list */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <View key={item.id} style={[styles.notificationCard, { backgroundColor: colors.card }]}>
            <View style={styles.topRow}>
              <Feather
                name="bell"
                size={16}
                color={colors.primary}
                style={styles.titleIcon}
              />
              <Text style={[styles.notificationTitle, { color: colors.textPrimary }]}>{item.title}</Text>
            </View>

            <Text style={[styles.notificationMessage, { color: colors.textSecondary }]}>{item.message}</Text>

            <TouchableOpacity style={[styles.markButton, { backgroundColor: colors.background }]}>
              <Text style={[styles.markButtonText, { color: '#FFFFFF' }]}>Mark as done</Text>
              <Feather
                name="check"
                size={14}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.primary }]}>Keep tracking your advancement</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: 60,
    paddingBottom: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

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

  backButtonText: {
    fontSize: 20,
  },

  pixelArrow: {
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 24,
  },

  titleContainer: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontFamily: "PixelifySans_600SemiBold",
    marginBottom: 15,
  },

  titleLine: {
    width: 220,
    height: 2,
    marginTop: 3,
    borderRadius: 2,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  notificationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  titleIcon: {
    marginRight: 8,
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  notificationMessage: {
    fontSize: 15,
    marginBottom: 12,
    marginLeft: 24,
  },

  markButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 24,
  },

  markButtonText: {
    fontSize: 12,
    fontWeight: "400",
    marginRight: 4,
  },

  footer: {
    alignItems: "center",
    paddingVertical: 30,
  },

  footerText: {
    textAlign: "center",
    fontSize: 32,
    fontFamily: "PixelifySans_600SemiBold",
  },
});