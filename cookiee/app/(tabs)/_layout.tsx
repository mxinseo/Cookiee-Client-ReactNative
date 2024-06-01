import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "index",
        }}
      />
      <Stack.Screen
        name="CalendarHome"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="DeviceRegistration"
        options={{
          title: "Login",
        }}
      />
    </Stack>
  );
}
