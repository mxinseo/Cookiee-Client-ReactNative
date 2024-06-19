import { Stack } from "expo-router";

export default ShowCookieeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "showCookiee",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[cate]"
        options={{
          headerTitle: "categoryheadertitle",
          headerShown: false,
        }}
      />
    </Stack>
  );
};
