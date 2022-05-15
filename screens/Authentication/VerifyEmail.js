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
    ToastAndroid
} from "react-native";
import { COLORS, FONTS, SIZES, icons, dummyData, constants } from '../../constants';
import React from "react";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { verifyEmail } from "../../apis/UserApi";

const VerifyEmail = ({ navigation, route }) => {
    const [token, setToken] = useState("");

    const onSubmit = () =>{
        verifyEmail({email:route.params.email, token})
        .then(()=>{
            ToastAndroid.showWithGravity(
                `Email verified`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
            navigation.push("Login")})
    }

    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary2]}
            style={styles.gradientContainer}
        >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={{ width: '100%', height: '100%' }}>
                        <View
                            style={{
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
                                    Verify email
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
                                    value={token}
                                    onChangeText={(value) => {
                                        setToken(value);
                                    }}
                                    placeholder="Code"
                                />
                            </View>
                            
                            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                                <Text style={{ color: "white", fontSize: 15 }}>Verify email</Text>
                            </TouchableOpacity>

                            <View style={{ alignItems: "center", marginTop: 30 }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Text style={{ color: "#666666" }}>I have an account</Text>
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
        width: '100%',
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

export default VerifyEmail;
