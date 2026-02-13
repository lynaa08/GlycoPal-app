import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";

type ItemProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

function Item({ title, icon, onPress }: ItemProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        { borderBottomColor: colors.border },
        pressed && { opacity: 0.6 },
      ]}
    >
      <View style={styles.left}>
        <Ionicons name={icon} size={20} color={colors.textSecondary} />
        <Text style={[styles.text, { color: colors.textPrimary }]}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#777" />
    </Pressable>
  );
}

export default function Profile() {
  const { colors } = useTheme();
  const [homePageType, setHomePageType] = useState<'adult' | 'child'>('adult');

  // Load home page preference
  useEffect(() => {
    const loadPreference = async () => {
      try {
        const preference = await AsyncStorage.getItem('homePageType');
        if (preference === 'adult' || preference === 'child') {
          setHomePageType(preference);
        }
      } catch (error) {
        console.error('Error loading home page preference:', error);
      }
    };

    loadPreference();
  }, []);

  // Toggle between adult and child mode
  const handleToggleGameMode = async () => {
    const newMode = homePageType === 'adult' ? 'child' : 'adult';
    try {
      await AsyncStorage.setItem('homePageType', newMode);
      setHomePageType(newMode);
      // You might want to show a toast or alert here to inform the user
      alert(`Home page changed to ${newMode === 'adult' ? 'Adult' : 'Child'} mode. Please navigate to the Home tab to see the change.`);
    } catch (error) {
      console.error('Error saving home page preference:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Profile Settings</Text>

      <Item title="Compte" icon="person-outline" />
      <Item title="Language" icon="language-outline" />
      <Item title="Export Medical Data" icon="paper-plane-outline" />
      <Item title="Notifications" icon="notifications-outline" onPress={() => router.push('/notifications')} />
      <Item
        title={`Change the game (Current: ${homePageType === 'adult' ? 'Adult' : 'Child'})`}
        icon="game-controller-outline"
        onPress={handleToggleGameMode}
      />
      <Item title="Delete the compte" icon="trash-outline" />
      <Item title="Signaler un bug" icon="bug-outline" />
      <Item title="Sign Out" icon="log-out-outline" onPress={() => router.push('/login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 25,
    alignSelf: "center",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  text: {
    fontSize: 15,
  },
});