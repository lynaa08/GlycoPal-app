import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import {
  PixelifySans_400Regular,
  PixelifySans_600SemiBold,
  PixelifySans_700Bold,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Load Pixelify Sans font
  let [fontsLoaded] = useFonts({
    PixelifySans_400Regular,
    PixelifySans_600SemiBold,
    PixelifySans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>
          Log <Text style={styles.logoBlue}>In</Text>
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Identifier Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Identifier</Text>
          <TextInput
            style={styles.input}
            value={identifier}
            onChangeText={setIdentifier}
            placeholder=""
            placeholderTextColor="#8C92D9"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder=""
            placeholderTextColor="#8C92D9"
            secureTextEntry
          />
        </View>

        {/* Log In Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>You don&apos;t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04082A", // Dark navy blue background
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  logoContainer: {
    marginTop: 80,
    marginBottom: 60,
    alignItems: "center",
  },
  logo: {
    fontSize: 64,
    color: "#FFFFFF",
    fontFamily: "PixelifySans_700Bold",
    textAlign: "center",
  },
  logoBlue: {
    color: "#4DA6FF", // Light blue for "In"
  },
  form: {
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontFamily: "PixelifySans_600SemiBold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#1A1F5A", // Dark purple-blue input background
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    fontFamily: "PixelifySans_400Regular",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2A2F6A",
  },
  loginButton: {
    backgroundColor: "#4DA6FF", // Light blue button
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 40,
    shadowColor: "#4DA6FF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    color: "#FFFFFF", // White text on button
    fontSize: 22,
    fontFamily: "PixelifySans_700Bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20,
  },
  signupText: {
    color: "#B8C1FF", // Light purple-blue text
    fontSize: 14,
    fontFamily: "PixelifySans_400Regular",
  },
  signupLink: {
    color: "#4DA6FF", // Light blue link
    fontSize: 14,
    fontFamily: "PixelifySans_700Bold",
  },
});