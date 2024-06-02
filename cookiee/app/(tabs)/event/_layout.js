import { Stack } from "expo-router";

export default EventDetailLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "EventDetailLayout",
          headerShown: false,
        }}
      />
    </Stack>
  );
};
