import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
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

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
        {/* Header with Logo */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            Sign <Text style={styles.logoBlue}>Up</Text>
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder=""
              placeholderTextColor="#8C92D9"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Full Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder=""
              placeholderTextColor="#8C92D9"
            />
          </View>

          {/* Phone Number Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder=""
              placeholderTextColor="#8C92D9"
              keyboardType="phone-pad"
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

          {/* Next Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => router.push("/patient-infos")}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 40,
  },
  header: {
    paddingTop: 70,
    paddingHorizontal: 30,
    paddingBottom: 50,
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    color: "#FFFFFF",
    fontFamily: "PixelifySans_700Bold",
    textAlign: "center",
  },
  logoBlue: {
    color: "#4DA6FF", // Light blue for "Up"
  },
  form: {
    paddingHorizontal: 30,
  },
  inputGroup: {
    marginBottom: 24,
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
    padding: 16,
    fontSize: 16,
    fontFamily: "PixelifySans_400Regular",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2A2F6A",
  },
  nextButton: {
    backgroundColor: "#4DA6FF", // Light blue button
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#4DA6FF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    color: "#04082A", // Dark text on light button
    fontSize: 20,
    fontFamily: "PixelifySans_700Bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    alignItems: "center",
  },
  loginText: {
    color: "#B8C1FF", // Light purple-blue text
    fontSize: 14,
    fontFamily: "PixelifySans_400Regular",
  },
  loginLink: {
    color: "#4DA6FF", // Light blue link
    fontSize: 14,
    fontFamily: "PixelifySans_700Bold",
  },
});