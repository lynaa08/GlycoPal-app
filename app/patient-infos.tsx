 import {
  PixelifySans_400Regular,
  PixelifySans_600SemiBold,
  PixelifySans_700Bold,
  useFonts,
} from "@expo-google-fonts/pixelify-sans";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Generate options for dropdowns
const generateDays = () =>
  Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const generateMonths = () =>
  Array.from({ length: 12 }, (_, i) => (i + 1).toString());
const generateYears = () => Array.from({ length: 100 }, (_, i) => i.toString());

export default function PatientInfosScreen() {
  const [age, setAge] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");
  const [diabetesDuration, setDiabetesDuration] = useState({
    day: "",
    month: "",
    years: "",
  });
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");

  // Dropdown modal states
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Load Pixelify Sans font
  let [fontsLoaded] = useFonts({
    PixelifySans_400Regular,
    PixelifySans_600SemiBold,
    PixelifySans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Picker Modal Component
  const PickerModal = ({
    visible,
    onClose,
    data,
    onSelect,
    title,
  }: {
    visible: boolean;
    onClose: () => void;
    data: string[];
    onSelect: (value: string) => void;
    title: string;
  }) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#4DA6FF" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.pickerItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}>
                <Text style={styles.pickerItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
  const handleSignUp = () => {
    if (
      !age ||
      !type ||
      !gender ||
      !height ||
      !weight ||
      !bloodSugar ||
      !diabetesDuration.day ||
      !diabetesDuration.month ||
      !diabetesDuration.years
    ) {
      Alert.alert("Incomplete form", "Please fill all required fields");
      return;
    }
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#4DA6FF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Patient Informations</Text>
            </View>

            {/* Patient Information Section */}
            <View style={styles.section}>
              {/* Age Input */}
              <View style={styles.inputRow}>
                <Text style={styles.label}>Age:</Text>
                <TextInput
                  style={styles.lineInput}
                  value={age}
                  onChangeText={setAge}
                  placeholder="__________"
                  placeholderTextColor="#8C92D9"
                  keyboardType="numeric"
                />
              </View>

              {/* Type Input */}
              <View style={styles.inputRow}>
                <Text style={styles.label}>Type:</Text>
                <TextInput
                  style={styles.lineInput}
                  value={type}
                  onChangeText={setType}
                  placeholder="__________"
                  placeholderTextColor="#8C92D9"
                />
              </View>

              {/* Gender Selection */}
              <View style={styles.genderRow}>
                <Text style={styles.label}>Gender:</Text>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setGender("male")}>
                  <View
                    style={[
                      styles.checkbox,
                      gender === "male" && styles.checkboxSelected,
                    ]}>
                    {gender === "male" && <View style={styles.checkboxInner} />}
                  </View>
                  <Text style={styles.checkboxLabel}>Male</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setGender("female")}>
                  <View
                    style={[
                      styles.checkbox,
                      gender === "female" && styles.checkboxSelected,
                    ]}>
                    {gender === "female" && (
                      <View style={styles.checkboxInner} />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Measurements Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Measurements</Text>

              <View style={styles.inputRow}>
                <Text style={styles.label}>Height:</Text>
                <TextInput
                  style={styles.lineInput}
                  value={height}
                  onChangeText={setHeight}
                  placeholder="__________"
                  placeholderTextColor="#8C92D9"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.label}>Weight:</Text>
                <TextInput
                  style={styles.lineInput}
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="__________"
                  placeholderTextColor="#8C92D9"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.label}>Blood Sugar Level:</Text>
                <TextInput
                  style={styles.lineInput}
                  value={bloodSugar}
                  onChangeText={setBloodSugar}
                  placeholder="__________"
                  placeholderTextColor="#8C92D9"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Medical History Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Medical History</Text>

              <Text style={styles.questionText}>
                How long have you had diabetes?
              </Text>

              <View style={styles.dropdownRow}>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowDayPicker(true)}>
                  <Text style={styles.dropdownText}>
                    {diabetesDuration.day || "Day"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#04082A" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowMonthPicker(true)}>
                  <Text style={styles.dropdownText}>
                    {diabetesDuration.month || "Month"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#04082A" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowYearPicker(true)}>
                  <Text style={styles.dropdownText}>
                    {diabetesDuration.years || "Years"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#04082A" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Emergency Contact Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Emergency Contact (Optional)
              </Text>

              <View style={styles.inputRow}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                  style={styles.lineInput}
                  value={emergencyName}
                  onChangeText={setEmergencyName}
                  placeholder="__________"
                  placeholderTextColor="#8C92D9"
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.label}>Phone Number:</Text>
                <TextInput
                  style={styles.lineInput}
                  value={emergencyPhone}
                  onChangeText={setEmergencyPhone}
                  placeholder="__________"
                  placeholderTextColor="#8C92D9"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.label}>Relationship:</Text>
                <TextInput
                  style={styles.lineInput}
                  value={emergencyRelationship}
                  onChangeText={setEmergencyRelationship}
                  placeholder="________"
                  placeholderTextColor="#8C92D9"
                />
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[
                styles.signUpButton,
                (!age ||
                  !type ||
                  !gender ||
                  !height ||
                  !weight ||
                  !bloodSugar ||
                  !diabetesDuration.day ||
                  !diabetesDuration.month ||
                  !diabetesDuration.years) && { opacity: 0.5 },
              ]}
              disabled={
                !age ||
                !type ||
                !gender ||
                !height ||
                !weight ||
                !bloodSugar ||
                !diabetesDuration.day ||
                !diabetesDuration.month ||
                !diabetesDuration.years
              }
              onPress={handleSignUp}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Picker Modals */}
          <PickerModal
            visible={showDayPicker}
            onClose={() => setShowDayPicker(false)}
            data={generateDays()}
            onSelect={(value) =>
              setDiabetesDuration({ ...diabetesDuration, day: value })
            }
            title="Select Day"
          />

          <PickerModal
            visible={showMonthPicker}
            onClose={() => setShowMonthPicker(false)}
            data={generateMonths()}
            onSelect={(value) =>
              setDiabetesDuration({ ...diabetesDuration, month: value })
            }
            title="Select Month"
          />

          <PickerModal
            visible={showYearPicker}
            onClose={() => setShowYearPicker(false)}
            data={generateYears()}
            onSelect={(value) =>
              setDiabetesDuration({ ...diabetesDuration, years: value })
            }
            title="Select Years"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04082A",
  },
  innerContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1A1F5A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    color: "#4DA6FF",
    fontFamily: "PixelifySans_700Bold",
    flex: 1,
  },
  section: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    color: "#4DA6FF",
    fontFamily: "PixelifySans_700Bold",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "PixelifySans_400Regular",
    marginRight: 10,
    minWidth: 80,
  },
  lineInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "PixelifySans_400Regular",
    borderBottomWidth: 2,
    borderBottomColor: "#8C92D9",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  genderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#4DA6FF",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "transparent",
  },
  checkboxSelected: {
    backgroundColor: "#1A1F5A",
  },
  checkboxInner: {
    width: 14,
    height: 14,
    backgroundColor: "#4DA6FF",
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "PixelifySans_400Regular",
  },
  questionText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "PixelifySans_400Regular",
    marginBottom: 15,
  },
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  dropdown: {
    flex: 1,
    backgroundColor: "#4DA6FF",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#04082A",
    fontFamily: "PixelifySans_600SemiBold",
  },
  signUpButton: {
    backgroundColor: "#4DA6FF",
    marginHorizontal: 30,
    marginTop: 20,
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#4DA6FF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signUpButtonText: {
    color: "#04082A",
    fontSize: 20,
    fontFamily: "PixelifySans_700Bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(4, 8, 42, 0.9)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1A1F5A",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: "50%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2F6A",
  },
  modalTitle: {
    fontSize: 20,
    color: "#4DA6FF",
    fontFamily: "PixelifySans_700Bold",
  },
  pickerItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2F6A",
  },
  pickerItemText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: "PixelifySans_600SemiBold",
  },
});
