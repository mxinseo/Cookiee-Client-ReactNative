import { Stack } from "expo-router";

export default CategoryAddLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "CategoryAddLayout",
          headerShown: false,
        }}
      />
    </Stack>
  );
};