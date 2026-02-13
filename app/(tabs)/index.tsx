import {
  PixelifySans_600SemiBold,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Line } from "react-native-svg";
import { useRouter } from 'expo-router';

// Image sequences for each activity
const IMAGE_SEQUENCES = {
  meals: [
    require('../../assets/images/eat1.svg'),
    require('../../assets/images/eat2.svg'),
    require('../../assets/images/eat3.svg')
  ],
  activity: [
    require('../../assets/images/run1.svg'),
    require('../../assets/images/run2.svg')
  ],
  glucose: [
    require('../../assets/images/hi.svg') // Using hi.svg for glucose monitoring
  ],
  medicine: [
    require('../../assets/images/take_med1.svg'),
    require('../../assets/images/take_med2.svg'),
    require('../../assets/images/take_med3.svg'),
    require('../../assets/images/take_med4.svg')
  ]
};

export default function HomeScreen() {
  const [userType, setUserType] = useState<'adult' | 'child' | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImages, setCurrentImages] = useState<any[]>([require('../../assets/images/hello.svg')]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Load Pixelify Sans font
  let [fontsLoaded] = useFonts({
    PixelifySans_600SemiBold,
  });

  useEffect(() => {
    const loadUserType = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem('userType');
        if (storedUserType === 'adult' || storedUserType === 'child') {
          setUserType(storedUserType);
        }
      } catch (error) {
        console.error('Error loading user type:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserType();
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startImageCarousel = (activityType: keyof typeof IMAGE_SEQUENCES) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const images = IMAGE_SEQUENCES[activityType];
    setCurrentImages(images);
    setCurrentImageIndex(0);
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Start cycling through images
    let index = 0;
    intervalRef.current = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImageIndex(index);
      
      // Stop after one complete cycle
      if (index === images.length - 1) {
        setTimeout(() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            // Return to default image after completion
            setCurrentImages([require('../../assets/images/hello.svg')]);
            setCurrentImageIndex(0);
            setIsAnimating(false);
          }
        }, 1000); // Show last image for 1 second before resetting
      }
    }, 800); // Change image every 800ms
  };

  // Function to show hi.svg when boy is clicked
  const showHiImage = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentImages([require('../../assets/images/hi.svg')]);
    setCurrentImageIndex(0);
    
    // Reset to hello.svg after 2 seconds
    setTimeout(() => {
      setCurrentImages([require('../../assets/images/hello.svg')]);
      setCurrentImageIndex(0);
      setIsAnimating(false);
    }, 2000);
  };

  // Function to handle START LOG button press
  const handleStartLog = () => {
    router.push('/(tabs)/logs');
  };

  if (loading || !fontsLoaded) {
    return null;
  }

  // Adult version (original constellation design)
  if (userType === 'adult') {
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

        {/* CONSTELLATION CARD */}
        <View style={styles.card}>
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

          <View style={styles.constellationLabel}>
            <Text style={styles.pixelSmall}>THE BIG DIPPER</Text>
          </View>
        </View>

        {/* STARS COUNT */}
        <View style={styles.starsSection}>
          <Text style={styles.pixelBig}>12 Stars</Text>
          <Text style={styles.pixelSmall}>TOTAL FOUND</Text>
        </View>

        {/* LOCKED CARD */}
        <View style={styles.lockedCard}>
          <Ionicons name="lock-closed-outline" size={26} color="#0B0F3A" />
          <Text style={styles.pixelDark}>Continue to unlock it</Text>
        </View>

        {/* START BUTTON */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartLog}>
          <Ionicons name="add-circle" size={20} color="black" />
          <Text style={styles.pixelButton}>START LOG</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Child version with image carousel
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.smallStarBox}>
            <Ionicons name="star" size={16} color="#FFD84D" />
          </View>
          <View>
            <Text style={[styles.title, styles.pixelFont]}>
              Glyco<Text style={{ color: "#4DA6FF" }}>Pal</Text>
            </Text>
            <Text style={[styles.level, styles.pixelFont]}>Level 4</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.themeButton}>
          <Ionicons name="sunny" size={20} color="#4DA6FF" />
        </TouchableOpacity>
      </View>

      {/* CHARACTER WITH CAROUSEL */}
      <TouchableOpacity 
        style={styles.characterContainer}
        onPress={showHiImage}
        disabled={isAnimating}
      >
        <Image 
          key={`${currentImageIndex}-${currentImages.length}`}
          source={currentImages[currentImageIndex]} 
          style={styles.characterImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* LEVEL AND PERCENTAGE WITH ICONS */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: '#4A90E2' }]}>
          <Text style={[styles.statValue, styles.pixelFont, { color: '#FFFFFF', marginBottom: 8 }]}>Level 7</Text>
          <Text style={[styles.statNumber, styles.pixelFont, { color: '#FFFFFF', fontSize: 16 }]}>10.XP</Text>
        </View>
        <View style={styles.statBox}>
          <Image 
            source={require('../../assets/images/99%.svg')} 
            style={styles.statIcon}
            resizeMode="contain"
          />
          <Text style={[styles.statValue, styles.pixelFont]}>Progress</Text>
          <Text style={[styles.statNumber, styles.pixelFont]}>99%</Text>
        </View>
      </View>

      {/* FOUR ACTION BUTTONS WITH CUSTOM COLORS AND ICONS */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#992222' }]}
          onPress={() => startImageCarousel('meals')}
          disabled={isAnimating}
        >
          <Image 
            source={require('../../assets/images/meal.svg')} 
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={[styles.buttonText, styles.pixelFont]}>Meals</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#F39C12' }]}
          onPress={() => startImageCarousel('activity')}
          disabled={isAnimating}
        >
          <Image 
            source={require('../../assets/images/run.svg')} 
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={[styles.buttonText, styles.pixelFont]}>Activity</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#479DFF' }]}
          onPress={() => startImageCarousel('glucose')}
          disabled={isAnimating}
        >
          <Image 
            source={require('../../assets/images/glucose.svg')} 
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={[styles.buttonText, styles.pixelFont]}>Glucose</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#82AA2C' }]}
          onPress={() => startImageCarousel('medicine')}
          disabled={isAnimating}
        >
          <Image 
            source={require('../../assets/images/medoc.svg')} 
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={[styles.buttonText, styles.pixelFont]}>Medicine</Text>
        </TouchableOpacity>
      </View>

      {/* START BUTTON */}
      <TouchableOpacity style={styles.startButton} onPress={handleStartLog}>
        <Ionicons name="add-circle" size={20} color="black" />
        <Text style={[styles.pixelButton, styles.pixelFont]}>START LOG</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... existing styles remain the same ...
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

  // Adult styles
  card: {
    backgroundColor: "#1A1F5A",
    height: 250,
    borderRadius: 30,
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

  // Child styles
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
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    minWidth: 100,
  },

  statIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },

  statValue: {
    color: "#B8C1FF",
    fontSize: 12,
    marginBottom: 5,
  },

  statNumber: {
    color: "#4DA6FF",
    fontSize: 20,
  },

  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 30,
  },

  actionButton: {
    width: "48%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
  },

  buttonIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    marginTop: 8,
  },

  // Shared styles
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

  // Pixel font utility
  pixelFont: {
    fontFamily: "PixelifySans_600SemiBold",
  },
});