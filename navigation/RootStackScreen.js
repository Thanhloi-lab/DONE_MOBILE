import { createStackNavigator } from "@react-navigation/stack";
import {LoginScreen, RegisterScreen, ForgotPassword} from '../screens';

const Stack = createStackNavigator();

export default function RootStackScreen() {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'Home'}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    )
}

