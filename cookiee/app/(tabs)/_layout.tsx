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
      <Stack.Screen
        name="day"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="event"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="form"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen

        name="sidebar"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="categoryFix"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="categoryAdd"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="categoryEdit"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="showCookiee"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="myPage"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    <Stack.Screen
        name="updateForm"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
