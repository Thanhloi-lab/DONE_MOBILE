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

const Register = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary1]}
            style={styles.gradientContainer}
        >
            <View style={styles.container}>
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                    <Text style={{ fontSize: 24, color: "#333333", fontWeight: "bold" }}>
                        Register
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
                        secureTextEntry={true}
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
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={(value) => {
                            setConfirmPasswordError(
                                !validate({ password, confirmPassword }, "password")
                            );
                            setConfirmPassword(value);
                        }}
                        placeholder="Comfirm-password"
                        secureTextEntry={true}
                    />
                    <View style={styles.icon}>
                        <Text>icon</Text>
                    </View>
                </View>
                {confirmPasswordError && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Confirm password is not match</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: "white", fontSize: 15 }}>REGISTER</Text>
                </TouchableOpacity>

                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <TouchableOpacity>
                        <Text style={{ color: "#666666" }}>You have an account</Text>
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

export default Register;
