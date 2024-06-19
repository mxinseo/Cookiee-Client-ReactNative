import { Stack } from "expo-router";

export default myPageLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "myPageLayout",
          headerShown: false,
        }}
      />
    </Stack>
  );
};