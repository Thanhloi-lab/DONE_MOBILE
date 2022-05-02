import { createStackNavigator } from "@react-navigation/stack";
import {Login, Register, ForgotPassword} from '../screens';
import { COLORS } from '../constants';
import {View} from 'react-native'

const Stack = createStackNavigator();

export default function RootStackScreen() {
    return(
        <View style={{
            flex: 1,
            backgroundColor: COLORS.primary
        }}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={'Home'}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </Stack.Navigator>
        </View>
        
    )
}

