import 'react-native-gesture-handler';
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import CustomDrawer from "./navigation/CustomDrawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import LoadFonts from './LoadFonts'
import AppLoading from "expo-app-loading";
import {Group, TaskDetail} from './screens'

//store
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)
const Stack = createStackNavigator();

export default function App() {
    const [isLoaded] = LoadFonts();

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        initialRouteName={'Home'}
                    >
                        <Stack.Screen name="Home" component={CustomDrawer} />
                        <Stack.Screen name="Detail" component={TaskDetail} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
