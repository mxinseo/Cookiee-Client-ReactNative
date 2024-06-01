import { Stack } from "expo-router";

export default ModalLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "modal index",
        }}
      />
    </Stack>
  );
};
