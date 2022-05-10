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
    KeyboardAvoidingView
} from "react-native";

import {
    Title,
    Caption,

} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import React, { useLayoutEffect } from "react";
import { COLORS, FONTS, SIZES, icons, dummyData } from '../../constants'


import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { validate } from "../../util/validation";


import { useDispatch, useSelector } from "react-redux";
import authenticationSlice from '../../stores/Authentication/authenticationSlice';
import { SafeAreaView } from "react-native-safe-area-context";


const EditContact = ({ navigation }) => {
    const [email, setEmail] = useState(dummyData.myProfile?.email);
    const [emailError, setEmailError] = useState(false);
    const [phone, setPhone] = useState(dummyData.myProfile?.phone);
    const [phoneError, setPhoneError] = useState(false);

    const [show, setShow] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        emailError || phoneError ? setError(true) : setError(false)
    }, [emailError, phoneError])



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

                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setShow(""); }} >
                    <KeyboardAvoidingView behavior="padding" style={styles.container}>

                        <View>

                            <View style={[styles.inputContainer, error === 1 ? show === 1 && { borderWidth: 1, borderColor: "red" } : show === 1 && { borderWidth: 1, borderColor: "lightgreen" }]}>
                                <View style={styles.icon}>
                                    <Image source={icons.email1}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: "red"
                                        }}
                                    />
                                    {show === 1 && (<View style={[styles.icon, { justifyContent: "flex-end", marginLeft: "10%" }]}>
                                        <TouchableOpacity onPress={() => {
                                            setEmail(""); setEmailError(!validate("", "email"));
                                            setShow(""); setError(1);
                                        }}>
                                            <Image source={icons.close1} style={{
                                                width: 20,
                                                height: 20,

                                            }}
                                            />
                                        </TouchableOpacity></View>)
                                    }
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={email}
                                    onChangeText={(value) => {
                                        setEmailError(!validate(value, "email"));
                                        setEmail(value);
                                        value !== '' ? setShow(1) : setShow('');
                                        emailError ? setError(1) : setError("")

                                    }}
                                    onPressIn={() => { if (email !== '') setShow(1); emailError ? setError(1) : setError("") }}

                                    placeholder="Email"
                                />
                            </View>
                            {emailError && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>
                                        Valid email is required: ex@gmail.com
                                    </Text>
                                </View>
                            )}

                            <View style={[styles.inputContainer, error === 2 ? show === 2 && { borderWidth: 1, borderColor: "red" } : show === 2 && { borderWidth: 1, borderColor: "lightgreen" }]}>
                                <View style={styles.icon}>
                                    <Image source={icons.phone1}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: "red"
                                        }}
                                    />
                                    {show === 2 && (<View style={[styles.icon, { justifyContent: "flex-end", marginLeft: "10%" }]}>
                                        <TouchableOpacity onPress={() => {
                                            setPhone(""); setPhoneError(!validate("", "phone"));
                                            setShow(""); setError(2);
                                        }}>
                                            <Image source={icons.close1} style={{
                                                width: 20,
                                                height: 20,

                                            }}
                                            />
                                        </TouchableOpacity></View>)
                                    }
                                </View>
                                <TextInput
                                    keyboardType="numeric"
                                    style={styles.input}
                                    value={phone}
                                    onChangeText={(value) => {
                                        setPhoneError(!validate(value, "phone"));
                                        setPhone(value);
                                        value !== '' ? setShow(2) : setShow('');
                                        phoneError ? setError(2) : setError("")
                                    }}
                                    onPressIn={() => { if (phone !== '') setShow(2); phoneError ? setError(2) : setError("") }}

                                    placeholder="Phone Number"
                                />
                            </View>
                            {phoneError && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>
                                        Valid phone is required: 10 number
                                    </Text>
                                </View>
                            )}

                            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
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

export default EditContact
