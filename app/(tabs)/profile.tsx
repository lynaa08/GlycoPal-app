import { router } from 'expo-router'
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from '@/context/ThemeContext';

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
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Profile Settings</Text>

      <Item title="Compte" icon="person-outline" />
      <Item title="Language" icon="language-outline" />
      <Item title="Export Medical Data" icon="paper-plane-outline" />
      <Item title="Notifications" icon="notifications-outline" onPress={() => router.push('/notifications')} />
      <Item title="Change the game" icon="game-controller-outline" />
      <Item title="Delete the compte" icon="trash-outline" />
      <Item title="Signaler un bug" icon="bug-outline" />
      <Item title="Sign Out" icon="log-out-outline" onPress={() => router.push('/login')}/>
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