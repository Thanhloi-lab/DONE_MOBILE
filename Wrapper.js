
import React from 'react';
import { StyleSheet, ActivityIndicator, View } from "react-native";
import CustomDrawer from "./navigation/CustomDrawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Group, TaskDetail } from './screens';
import RootStackScreen from './navigation/RootStackScreen';

//store
import { useSelector } from 'react-redux';

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
        <NavigationContainer>
            {(token !== null && token !== "") ? (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName={'Home'}
                >
                    <Stack.Screen name="Home" component={CustomDrawer} />
                    <Stack.Screen name="Detail" component={TaskDetail} />
                </Stack.Navigator>
            )
                :
                <RootStackScreen />
            }
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
