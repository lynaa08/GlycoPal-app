import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4DA6FF",
        tabBarInactiveTintColor: "#8E8EAA",

        tabBarStyle: {
          position: "absolute",

          width: width * 0.9,
          height: 75 ,

          alignSelf: "center",

         
          bottom: 0,

          backgroundColor: "#1E1A3B",
          borderRadius: 60,

          paddingVertical: 25,

          borderTopWidth: 0,
          elevation: 20,
        },

        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
    


      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="agenda"
        options={{
          title: "Agenda",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="logs"
        options={{
          title: "Logs",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="data"
        options={{
          title: "Data",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
