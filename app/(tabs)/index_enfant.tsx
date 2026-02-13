import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import {
  PixelifySans_600SemiBold,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";


// ================= IMAGES =================
const DEFAULT_IMAGE = require("../../assets/images/hello.png");

const IMAGE_SEQUENCES = {
  meals: [
    require("../../assets/images/eat1.png"),
    require("../../assets/images/eat2.png"),
    require("../../assets/images/eat3.png"),
  ],
  activity: [
    require("../../assets/images/run1.png"),
    require("../../assets/images/run2.png"),
  ],
  glucose: [
    require("../../assets/images/glucine1.png"),
    require("../../assets/images/glucine2.png"),
  ],
  medicine: [
    require("../../assets/images/take_med1.png"),
    require("../../assets/images/take_med2.png"),
    require("../../assets/images/take_med3.png"),
  ],
};


// ===================================================
// ================= CHILD HOME ONLY =================
// ===================================================
export function ChildHomeScreen() {
  const router = useRouter();
  const { colors, isDarkMode, toggleTheme } = useTheme();

  const [fontsLoaded] = useFonts({
    PixelifySans_600SemiBold,
  });

  const [images, setImages] = useState([DEFAULT_IMAGE]);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);


  // ================= CAROUSEL =================
  const startCarousel = (key: keyof typeof IMAGE_SEQUENCES) => {
    if (animating) return;

    const seq = IMAGE_SEQUENCES[key];

    setAnimating(true);
    setImages(seq);
    setIndex(0);

    // Special handling for activity - loop for 2 seconds with 150ms interval
    if (key === 'activity') {
      let i = 0;
      const startTime = Date.now();
      const duration = 2000; // 2 seconds
      const interval = 150; // 150ms between frames

      intervalRef.current = setInterval(() => {
        i = (i + 1) % seq.length; // Loop between 0 and 1
        setIndex(i);

        // Stop after 2 seconds
        if (Date.now() - startTime >= duration) {
          clearInterval(intervalRef.current!);
          setTimeout(() => {
            setImages([DEFAULT_IMAGE]);
            setIndex(0);
            setAnimating(false);
          }, interval);
        }
      }, interval);
    } else {
      // Original behavior for other buttons
      let i = 0;

      intervalRef.current = setInterval(() => {
        i++;

        if (i >= seq.length) {
          clearInterval(intervalRef.current!);

          setTimeout(() => {
            setImages([DEFAULT_IMAGE]);
            setIndex(0);
            setAnimating(false);
          }, 800);

          return;
        }

        setIndex(i);
      }, 600);
    }
  };


  // ================= CLICK CHARACTER =================
  const sayHi = () => {
    if (animating) return;

    setAnimating(true);
    setImages([require("../../assets/images/hi.png")]);

    setTimeout(() => {
      setImages([DEFAULT_IMAGE]);
      setAnimating(false);
    }, 1500);
  };


  const goLogs = () => {
    router.push("/(tabs)/logs");
  };


  if (!fontsLoaded) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Glyco<Text style={{ color: colors.accent }}>Pal</Text>
        </Text>

        <TouchableOpacity
          style={[styles.themeBtn, { backgroundColor: colors.secondary }]}
          onPress={toggleTheme}
        >
          <Ionicons name={isDarkMode ? "sunny" : "moon"} size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>


      {/* CHARACTER */}
      <TouchableOpacity
        style={styles.characterContainer}
        onPress={sayHi}
        disabled={animating}
      >
        <Image
          source={images[index]}
          style={styles.character}
          resizeMode="contain"
        />
      </TouchableOpacity>


      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={[styles.statBox, { backgroundColor: colors.accent }]}>
          <Text style={[styles.statText, { color: colors.textPrimary }]}>Level 7</Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.statText, { color: colors.textPrimary }]}>99%</Text>
        </View>
      </View>


      {/* BUTTONS */}
      <View style={styles.grid}>

        <ActionButton
          color="#992222"
          label="Meals"
          icon="restaurant"
          onPress={() => startCarousel("meals")}
        />

        <ActionButton
          color="#F39C12"
          label="Activity"
          icon="fitness"
          onPress={() => startCarousel("activity")}
        />

        <ActionButton
          color="#479DFF"
          label="Glucose"
          icon="water"
          onPress={() => startCarousel("glucose")}
        />

        <ActionButton
          color="#82AA2C"
          label="Medicine"
          icon="medkit"
          onPress={() => startCarousel("medicine")}
        />
      </View>


      {/* START BUTTON */}
      <TouchableOpacity style={[styles.startBtn, { backgroundColor: isDarkMode ? "#C5A572" : "#E6D98D" }]} onPress={goLogs}>
        <Ionicons name="add-circle" size={20} color="black" />
        <Text style={styles.startText}>START LOG</Text>
      </TouchableOpacity>

    </View>
  );
}



// ===================================================
// =============== SMALL BUTTON COMPONENT ============
// ===================================================
function ActionButton({ color, label, icon, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.actionBtn, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color="white" />
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
}



// ===================================================
// ===================== STYLES ======================
// ===================================================
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
  },

  title: {
    color: "white",
    fontSize: 24,
    fontFamily: "PixelifySans_600SemiBold",
  },

  themeBtn: {
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  characterContainer: {
    alignItems: "center",
    marginVertical: 40,
  },

  character: {
    width: 160,
    height: 160,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  statBox: {
    padding: 18,
    backgroundColor: "#1A1F5A",
    borderRadius: 18,
    minWidth: 110,
    alignItems: "center",
  },

  statText: {
    color: "white",
    fontFamily: "PixelifySans_600SemiBold",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 40,
  },

  actionBtn: {
    width: "48%",
    padding: 22,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
  },

  btnText: {
    color: "white",
    marginTop: 8,
    fontFamily: "PixelifySans_600SemiBold",
  },

  startBtn: {
    marginTop: 20,
    backgroundColor: "#E6D98D",
    padding: 22,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  startText: {
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 18,
  },
});