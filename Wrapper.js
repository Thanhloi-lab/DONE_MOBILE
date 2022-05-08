import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import CustomDrawer from "./navigation/CustomDrawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Group, GroupDetail, ProjectDetail, TaskDetail } from "./screens";
import RootStackScreen from "./navigation/RootStackScreen";

//store
import { useSelector } from "react-redux";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createStackNavigator();

export default function Wrapper() {
  const token = useSelector((state) => state.authentication.token);

  return (
    <NavigationContainer style={{ flex: 1 }}>
      {token !== null && token !== "" ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Home"}
        >
          <Stack.Screen name="Home" component={CustomDrawer} />
          <Stack.Screen name="Detail" component={TaskDetail} />
          <Stack.Screen
            name="GroupDetail"
            component={GroupDetail}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="ProjectDetail"
            component={ProjectDetail}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
