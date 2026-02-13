/* eslint-disable @typescript-eslint/no-unused-vars */
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

import {
  PixelifySans_600SemiBold,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";

const COLORS = {
  background: "#04031D",
  card: "#1E1A3B",
  primary: "#FFFFFF",
  accent: "#479DFF",
  accentText: "#FFFFFF",
  textPrimary: "#D8D8D8",
  textSecondary: "#D8D8D8",
  markDoneBg: "#479DFF",
  headerText: "#FFFFFF",
  lineColor: "#FFFFFF",
  arrowBlue: "#479DFF", // Bleu pour la flèche };
};
const Dark__COLORS = {
  background: "#90BBEA",
  card: "#4C5EA2",
  primary: "#FFFFFF",
  accent: "#479DFF",
  accentText: "#FFFFFF",
  textPrimary: "#262626",
  textSecondary: "#D8D8D8",
  markDoneBg: "#479DFF",
  headerText: "#FFFFFF",
  lineColor: "#FFFFFF",
  arrowBlue: "#262626", // Bleu pour la flèche
};

export default function NotificationsScreen() {
  const navigation = useNavigation();

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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Row with arrow + title */}
        <View style={styles.headerRow}>
          {/* Back Button avec < en BLEU et Pixel, -- en normal blanc */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>
              <Text style={styles.pixelArrow}>{"<"}</Text>

            </Text>
          </TouchableOpacity>

          {/* Title - EN PIXELIFY SANS */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Notifications</Text>
            {/* Ligne blanche TRÈS GRANDE */}
            <View style={styles.titleLine} />
          </View>
        </View>
      </View>

      {/* Notifications list */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
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

            <TouchableOpacity style={styles.markButton}>
              <Text style={styles.markButtonText}>Mark as done</Text>
              <Feather
                name="check"
                size={14}
                color={COLORS.accentText}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Footer - EN PIXELIFY SANS */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Keep tracking your advancement</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    backgroundColor: "#1A1F4B",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20,
    zIndex: 10,
    top: -5,
  },

  backButtonText: {
    fontSize: 20,
    color: COLORS.headerText,
  },

  // < en Pixelify Sans et BLEU
  pixelArrow: {
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 24,
    color: COLORS.arrowBlue, // 🔵 BLEU
  },

  // -- en police normale (PAS pixel) et BLEU
  normalDash: {
    fontSize: 20,
    color: COLORS.arrowBlue,
    // fontFamily omitted to use default system font
  },

  titleContainer: {
    flex: 1,
    alignItems: "center",
  },

  // NOTIFICATIONS EN PIXELIFY SANS
  title: {
    fontSize: 28,
    color: COLORS.headerText,
    fontFamily: "PixelifySans_600SemiBold",
    marginBottom: 15,
  },

  // Ligne blanche TRÈS GRANDE
  titleLine: {
    width: 220,
    height: 2,
    backgroundColor: COLORS.lineColor,
    marginTop: 3,
    borderRadius: 2,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  notificationCard: {
    backgroundColor: COLORS.card,
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
    color: COLORS.textPrimary,
  },

  notificationMessage: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 12,
    marginLeft: 24,
  },

  markButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLORS.markDoneBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 24,
  },

  markButtonText: {
    fontSize: 12,
    color: COLORS.accentText,
    fontWeight: "400",
    marginRight: 4,
  },

  footer: {
    alignItems: "center",
    paddingVertical: 30,
  },

  // KEEP TRACKING EN PIXELIFY SANS
  footerText: {
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: 32,
    color: COLORS.headerText,
    fontFamily: "PixelifySans_600SemiBold",
  },
});
