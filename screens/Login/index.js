import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/theme";
import { validate } from "../../util/validation";


import { useDispatch, useSelector } from "react-redux";
import authenticationSlice from '../../stores/Authentication/authenticationSlice';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const dispatch = useDispatch();

    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary1]}
            style={styles.gradientContainer}
        >
            <View style={styles.container}>
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                    <Text style={{ fontSize: 24, color: "#333333", fontWeight: "bold" }}>
                        Member Login
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.icon}>
                        <Text>icon</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(value) => {
                            setEmailError(!validate(value, "email"));
                            setEmail(value);
                        }}
                        placeholder="Email"
                    />
                </View>
                {emailError && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            Valid email is required: ex@abc.zy
                        </Text>
                    </View>
                )}

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(value) => {
                            setPasswordError(!validate(value, "password"));
                            setPassword(value);
                        }}
                        placeholder="Password"
                    />
                    <View style={styles.icon}>
                        <Text>icon</Text>
                    </View>
                </View>
                {passwordError && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            Password must be 8 chars include number and uppercase
                        </Text>
                    </View>
                )}
                <TouchableOpacity style={styles.button} onPress={() => dispatch(authenticationSlice.actions.setToken('abc'))}>
                    <Text style={{ color: "white", fontSize: 15 }}>LOGIN</Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 5,
                    }}
                >
                    <Text style={{ color: "#999999", fontSize: 13 }}>Forgot </Text>
                    <TouchableOpacity>
                        <Text style={{ color: "#666666" }}>Username / Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <TouchableOpacity>
                        <Text style={{ color: "#666666" }}>Create your Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        alignItems: "center",
        paddingTop: 100,
    },
    container: {
        backgroundColor: "white",
        width: "90%",
        padding: 20,
        borderRadius: 10,
    },
    input: {
        height: 50,
    },
    inputContainer: {
        height: 50,
        fontSize: 15,
        borderWidth: 1,
        paddingLeft: 68,
        paddingRight: 30,
        borderRadius: 25,
        color: "#666666",
        backgroundColor: "#e6e6e6",
        marginBottom: 10,
        position: "relative",
        flexDirection: "row",
    },
    icon: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        left: 35,
    },
    errorContainer: {
        paddingVertical: 4,
        paddingLeft: 20,
        marginBottom: 10,
    },
    errorText: {
        color: "#c80000",
    },
    button: {
        fontSize: 15,
        backgroundColor: "#57b846",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        height: 50,
        marginTop: 20,
    },
});


export default Login
