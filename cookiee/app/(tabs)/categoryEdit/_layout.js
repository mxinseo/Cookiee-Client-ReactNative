import { Stack } from "expo-router";

export default CategoryEditLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "CategoryEditLayout",
          headerShown: false,
        }}
      />
    </Stack>
  );
};