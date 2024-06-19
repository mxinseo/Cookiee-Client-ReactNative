import { Stack } from "expo-router";

export default CategoryLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "CategoryLayout",
          headerShown: false,
        }}
      />
    </Stack>
  );
};