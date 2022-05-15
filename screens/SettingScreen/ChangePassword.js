import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TextInput,
    Image,
    TouchableOpacity,
    Keyboard,
    ImageBackground,
    ScrollView,
    KeyboardAvoidingView,
    ToastAndroid
} from "react-native";

import {
    Title,
    Caption,

} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import React from "react";
import { COLORS, FONTS, SIZES, icons, dummyData } from '../../constants'


import { useState, useLayoutEffect, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { validate } from "../../util/validation";


import { useDispatch, useSelector } from "react-redux";
import authenticationSlice from '../../stores/Authentication/authenticationSlice';
import { SafeAreaView } from "react-native-safe-area-context";
import { changePassword } from "../../apis/UserApi";



const ChangePassword = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [show, setShow] = useState("");
    const [error, setError] = useState("");
    const [hidePass, setHidePass] = useState("")

    const dispatch = useDispatch();

    const id = useSelector((state) => state.authentication.id);

    useLayoutEffect(() => {
        currentPasswordError ? setError(1) : setError("");
        newPasswordError ? setError(2) : setError("");
        confirmPasswordError ? setError(3) : setError("");
    }, [currentPasswordError, newPasswordError, confirmPasswordError])

    const onSubmit = () =>{
        console.log(id);
        changePassword({id:id, password: currentPassword, newPassword})
            .then((res)=>{
                console.log(res.status);
                ToastAndroid.showWithGravity(
                    `Password changed`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
            }
            )
    }

    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary2]}
            style={styles.gradientContainer}
        >


            <View style={{ width: '100%', height: '100%' }}>
                <View style={{
                    height: 50,
                    paddingHorizontal: SIZES.radius * 1.5,
                    marginTop: 40,
                    alignItems: "center",
                    flexDirection: "row"
                }}>
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: 'white',
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        alignItems: "center",
                        width: "80%"
                    }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Edit Contact Infomation</Text>
                    </View>

                </View>

                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setShow(''); }} >
                    <KeyboardAvoidingView behavior="padding" style={styles.container}>

                        <View>

                            <View style={[styles.inputContainer, error === 1 ? show === 1 && { borderWidth: 1, borderColor: "red" } : show === 1 && { borderWidth: 1, borderColor: "lightgreen" }]}>
                                <View style={styles.icon}>
                                    <Image source={icons.password}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: "red"
                                        }}
                                    />

                                    {show === 1 && (
                                        <View style={[styles.icon, { justifyContent: "flex-end", marginLeft: "40%" }]}>
                                            <TouchableOpacity onPress={() => {
                                                setCurrentPassword(""); setCurrentPasswordError(!validate("", "password"));
                                                setShow(""); setError(1);
                                            }}>
                                                <Image source={icons.close1} style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginLeft: "0%"
                                                }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => {
                                                hidePass === 1 ? setHidePass('') : setHidePass(1)
                                            }}>
                                                <Image source={hidePass ? icons.disable_eye : icons.eye} style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginLeft: "20%"
                                                }}
                                                />
                                            </TouchableOpacity>
                                        </View>)
                                    }
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={currentPassword}
                                    secureTextEntry={hidePass === 1 ? false : true}
                                    onChangeText={(value) => {
                                        setCurrentPasswordError(!validate(value, "password"));
                                        setCurrentPassword(value);
                                        value !== '' ? setShow(1) : setShow('');
                                        currentPasswordError ? setError(1) : setError("")

                                    }}
                                    onPressIn={() => { if (currentPassword !== '') setShow(1); currentPasswordError ? setError(1) : setError("") }}

                                    placeholder="Current Password"
                                />
                            </View>
                            {currentPasswordError && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>
                                        Valid currentPassword is required: 8 code
                                    </Text>
                                </View>
                            )}

                            <View style={[styles.inputContainer, error === 2 ? show === 2 && { borderWidth: 1, borderColor: "red" } : show === 2 && { borderWidth: 1, borderColor: "lightgreen" }]}>
                                <View style={styles.icon}>
                                    <Image source={icons.padlock}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: "red"
                                        }}
                                    />
                                    {show === 2 && (
                                        <View style={[styles.icon, { justifyContent: "flex-end", marginLeft: "40%" }]}>
                                            <TouchableOpacity onPress={() => {
                                                setNewPassword(""); setNewPasswordError(!validate("", "password"));
                                                setShow(""); setError(2);
                                            }}>
                                                <Image source={icons.close1} style={{
                                                    width: 20,
                                                    height: 20,

                                                }}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => {
                                                hidePass === 2 ? setHidePass('') : setHidePass(2)
                                            }}>
                                                <Image source={hidePass ? icons.disable_eye : icons.eye} style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginLeft: "20%"
                                                }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={newPassword}
                                    secureTextEntry={hidePass === 2 ? false : true}
                                    onChangeText={(value) => {
                                        setNewPasswordError(!validate(value, "password"));
                                        setNewPassword(value);
                                        value !== '' ? setShow(2) : setShow('');
                                        newPasswordError ? setError(2) : setError("")

                                    }}
                                    onPressIn={() => { if (newPassword !== '') setShow(2); newPasswordError ? setError(2) : setError("") }}

                                    placeholder="New Password"
                                />
                            </View>
                            {newPasswordError && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>
                                        Valid new password is required: 8 code
                                    </Text>
                                </View>
                            )}

                            <View style={[styles.inputContainer, error === 3 ? show === 3 && { borderWidth: 1, borderColor: "red" } : show === 3 && { borderWidth: 1, borderColor: "lightgreen" }]}>
                                <View style={styles.icon}>
                                    <Image source={icons.padlock}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: "red"
                                        }}
                                    />
                                    {show === 3 && (
                                        <View style={[styles.icon, { justifyContent: "flex-end", marginLeft: "40%" }]}>
                                            <TouchableOpacity onPress={() => {
                                                setConfirmPassword(""); setConfirmPasswordError(!validate("", "confirm-password"));
                                                setShow(""); setError(3);
                                            }}>
                                                <Image source={icons.close1} style={{
                                                    width: 20,
                                                    height: 20,

                                                }}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                hidePass === 3 ? setHidePass('') : setHidePass(3)
                                            }}>
                                                <Image source={hidePass ? icons.disable_eye : icons.eye} style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginLeft: "20%"
                                                }}
                                                />
                                            </TouchableOpacity>
                                        </View>)
                                    }



                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={confirmPassword}
                                    secureTextEntry={hidePass === 3 ? false : true}
                                    onChangeText={(value) => {

                                        setConfirmPassword(value);
                                        const password = newPassword;
                                        setConfirmPasswordError(!validate({ confirmPassword, password }, "confirm-password"));
                                        console.log({ newPassword, confirmPassword })
                                        value !== '' ? setShow(3) : setShow('');
                                        confirmPasswordError ? setError(3) : setError("")

                                    }}
                                    onPressIn={() => { if (confirmPassword !== '') setShow(3); confirmPasswordError ? setError(3) : setError("") }}

                                    placeholder="Confirm Password"
                                />
                            </View>
                            {confirmPasswordError && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>
                                        Valid confirm password is required: 8 code
                                    </Text>
                                </View>
                            )}

                            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                                <Text style={{ color: "white", fontSize: 15 }}>CONFIRMED</Text>
                            </TouchableOpacity>

                        </View>

                    </KeyboardAvoidingView>

                </TouchableWithoutFeedback>
            </View>

        </LinearGradient>


    )
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        // justifyContent: "flex-end",
        // alignItems: "center",
        paddingTop: 0,
        height: '100%',

    },
    container: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        paddingTop: 20,
        borderRadius: SIZES.radius * 2,

    },
    infoContainer: {
        backgroundColor: "ghostwhite",

        padding: 5,
        paddingBottom: 70,
        marginTop: 10,

    },
    input: {
        height: '100%',
        width: '90%',
        justifyContent: "flex-start",
        marginRight: 70,
        marginLeft: 40
    },
    inputContainer: {
        height: 50,
        fontSize: 15,
        paddingLeft: 68,
        paddingRight: 50,
        borderRadius: 25,
        color: "#ccc",
        backgroundColor: "#f7f7f7",
        marginBottom: 10,
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
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
        justifyContent: "space-between",
        left: 35,
        flex: 1,
        flexDirection: "row",
        paddingTop: 15

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
        marginRight: 30,
        marginLeft: 30
    },
});

export default ChangePassword
