import React, { useEffect, useState } from "react";
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function TalkingCharacter() {
  const messages = [
    "Your glucose looks stable 👍",
    "Keep monitoring your levels!",
    "Great job today 👏",
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const slideAnim = useState(new Animated.Value(200))[0];

  useEffect(() => {
    // slide up animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // auto hide after last message
    if (index === messages.length - 1) {
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: 200,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setVisible(false));
      }, 2000);
    }
  }, [index]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (index < messages.length - 1) {
            setIndex(index + 1);
          }
        }}
      >
        <View style={styles.bubble}>
          <Text style={styles.text}>{messages[index]}</Text>
        </View>

        <Image
          source={require("../assets/character.png")}
          style={styles.character}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bubble: {
    backgroundColor: "#2C2C54",
    padding: 12,
    borderRadius: 20,
    marginBottom: 5,
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  character: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
});
