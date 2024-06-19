import { Stack } from "expo-router";

export default collectCookiee = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "collectCookiee",
          headerShown: false,
        }}
      />
    </Stack>
  );
};
