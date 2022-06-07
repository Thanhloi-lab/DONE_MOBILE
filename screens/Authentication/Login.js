import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TextInput,
    Image,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    ToastAndroid,

} from "react-native";
import { COLORS, FONTS, SIZES, icons, dummyData, constants } from '../../constants';
import { done_name } from '../../constants/icons';
import React, { useEffect } from "react";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { validate } from "../../util/validation";


import { useDispatch, useSelector } from "react-redux";
import authenticationSlice from '../../stores/Authentication/authenticationSlice';
import { getUserInfo, login } from "../../apis/UserApi";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const dispatch = useDispatch();

    const onSubmit = async () => {
        try {
            const response = await login({ email, password })
            console.log("inin")
            if (response.status === 200) {
                // console.log("login");
                const json = await response.json()
                dispatch(authenticationSlice.actions.setToken(json))
                await AsyncStorage.setItem('token', json.token)
                await AsyncStorage.setItem('id', json.idUser + "")

            }
            else {
                ToastAndroid.showWithGravity(
                    "Wrong email or password",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

    }, [])

    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary2]}
            style={styles.gradientContainer}
        >

            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <KeyboardAvoidingView >
                    <View style={{ width: '100%', height: '100%' }}>
                        <View style={{
                            height: 260,
                            width: '100%',
                            alignItems: 'center',
                            flex: 1
                        }}>
                            <Image
                                source={icons.done_name}
                                style={{
                                    width: '100%',
                                    height: 150,
                                    tintColor: '#fff'
                                }}
                            />
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Pressure is motivation</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={{ alignItems: "center", marginBottom: 20 }}>
                                <Text style={{ fontSize: 24, color: "#333333", fontWeight: "bold" }}>
                                    Member Login
                                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.icon}>
                                    <Image source={icons.email}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
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
                                <View style={styles.icon}>
                                    <Image source={icons.password}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={password}
                                    onChangeText={(value) => {
                                        // setPasswordError(!validate(value, "password"));
                                        setPassword(value);
                                    }}
                                    placeholder="Password"
                                />
                            </View>
                            {passwordError && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>
                                        Password must be 8 chars include number and uppercase
                                    </Text>
                                </View>
                            )}


                            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                                <Text style={{ color: "white", fontSize: 15 }}>LOGIN</Text>
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 20
                                }}
                            >
                                <Text style={{ color: "#999999", fontSize: 13 }}>Forgot </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                                    <Text style={{ color: "#666666" }}>Username / Password?</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: "center", marginTop: 20 }}>
                                <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                                    <Text style={{ color: "#666666" }}>Create your Account</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: "center", marginTop: 20 }}>
                                <TouchableOpacity onPress={() => { navigation.navigate("SendCode") }}>
                                    <Text style={{ color: "#666666" }}>Send Verification code</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>

            </TouchableWithoutFeedback>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        // justifyContent: "flex-end",
        // alignItems: "center",
        paddingTop: 100,
        height: '100%',
    },
    container: {
        backgroundColor: "white",
        width: "100%",
        padding: 20,
        paddingBottom: 70,
        borderTopRightRadius: SIZES.radius * 2,
        borderTopLeftRadius: SIZES.radius * 2,
    },
    input: {
        height: '100%',
        width: '100%'
    },
    inputContainer: {
        height: 50,
        fontSize: 15,
        paddingLeft: 68,
        paddingRight: 30,
        borderRadius: 25,
        color: "#ccc",
        backgroundColor: "#f7f7f7",
        marginBottom: 10,
        position: "relative",
        flexDirection: "row",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    icon: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        left: 35,
        flex: 1
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

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
});


export default Login
