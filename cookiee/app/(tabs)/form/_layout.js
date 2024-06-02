import { Stack } from "expo-router";

export default FormLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // headerTitle: "form index",
          headerShown: false,
        }}
      />
    </Stack>
  );
};
