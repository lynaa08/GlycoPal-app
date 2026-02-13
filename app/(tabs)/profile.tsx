import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ItemProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

function Item({ title, icon, onPress }: ItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed && { opacity: 0.6 },
      ]}
    >
      <View style={styles.left}>
        <Ionicons name={icon} size={20} color="#CFCFFF" />
        <Text style={styles.text}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#777" />
    </Pressable>
  );
}

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>

      <Item title="Compte" icon="person-outline" />
      <Item title="Language" icon="language-outline" />
      <Item title="Export Medical Data" icon="paper-plane-outline" />
      <Item title="Notifications" icon="notifications-outline" />
      <Item title="Change the game" icon="game-controller-outline" />
      <Item title="Delete the compte" icon="trash-outline" />
      <Item title="Signaler un bug" icon="bug-outline" />
      <Item title="Sign Out" icon="log-out-outline" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050517",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    color: "#fff",
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
    borderBottomColor: "#1A1A2E",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  text: {
    color: "#E6E6FF",
    fontSize: 15,
  },
});