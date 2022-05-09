import React from "react";
import { StyleSheet, ActivityIndicator, View, Text, Pressable } from "react-native";
import CustomDrawer from "./navigation/CustomDrawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Group, GroupDetail, ProjectDetail, TaskDetail, Profile, Setting, EditPersonal, EditContact, ChangePassword } from "./screens";
import RootStackScreen from "./navigation/RootStackScreen";
import { COLORS, dummyData, SIZES } from "./constants";

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
                    <Stack.Screen
                        options={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: COLORS.primary,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 20
                            },
                            headerTitleAlign: "center"
                        }}
                        name="Detail"
                        component={TaskDetail}
                    />
                    <Stack.Screen
                        name="GroupDetail"
                        component={GroupDetail}
                        options={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: COLORS.primary,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 20
                            },
                            headerTitleAlign: "center"
                            // headerLeft:()=>{
                            //     <View>
                            //         <Text>ABC</Text>
                            //     </View>
                            // }
                            // headerRight: () => (
                            //     <Pressable
                            //         style={({ pressed }) => ({
                            //             opacity: pressed ? 0.5 : 1,
                            //             alignItems: "center",
                            //             justifyContent: "center",
                            //             padding:5
                            //         })}>
                            //         <View style={{
                            //             width:40,
                            //             height:40,
                            //             alignItems: "center",
                            //             justifyContent: "center",
                            //             alignContent:'center',
                            //             textAlign: "center",
                            //             textAlignVertical:'center'
                            //         }}>
                            //             <Text
                            //                 style={{
                            //                     fontSize:35,
                            //                     color: COLORS.primary
                            //                 }}
                            //             >
                            //                 +
                            //             </Text>
                            //         </View>

                            //     </Pressable>
                            // ),
                        }}
                    />
                    <Stack.Screen
                        name="ProjectDetail"
                        component={ProjectDetail}
                        options={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: COLORS.primary,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 20
                            },
                            headerTitleAlign: "center"
                        }}
                    />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="EditPersonal" component={EditPersonal} />
                    <Stack.Screen name="EditContact" component={EditContact} />
                    <Stack.Screen name="Setting" component={Setting} />
                    <Stack.Screen name="ChangePassword" component={ChangePassword} />
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
