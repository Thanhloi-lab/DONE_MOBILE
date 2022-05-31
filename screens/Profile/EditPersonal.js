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


import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';

import React from "react";
import { COLORS, FONTS, SIZES, icons, dummyData } from '../../constants'


import { useState, useEffect, useLayoutEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { validate } from "../../util/validation";


import { useDispatch, useSelector } from "react-redux";
import { editInfo, getUserInfo, getUserInfoById } from "../../apis/UserApi";
import authenticationSlice from "../../stores/Authentication/authenticationSlice";



const EditPersonal = ({ navigation }) => {
    const user = useSelector(state=>state.authentication.user)


    const [name, setName] = useState(user.name)
    const [nameError, setNameError] = useState(false);
   
    const [phone, setPhone] = useState(user.phone);
    const [phoneError, setPhoneError] = useState(false);

    const dispatch = useDispatch();


    const onSubmit = async () =>{
        const res = await editInfo({name, phone, id: user.idUser}, user.token)
        if(res.status === 200){
            ToastAndroid.showWithGravity(
                `Info Updated`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
            const userRes =  await getUserInfoById(user.idUser, user.token)
            const userJson = await userRes.json()
            dispatch(authenticationSlice.actions.setToken({token:user.token,id:user.id, info: userJson}))
                
        }
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
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Edit Personal Infomation</Text>
                    </View>

                </View>

                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }} >
                    <KeyboardAvoidingView behavior="padding" style={styles.container}>

                        <View >
                            <View >
                                <View style={[styles.inputContainer]}>
                                    <View style={styles.icon}>
                                        <Image source={icons.user1}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: "red"
                                            }}
                                        />
                                        {(<View style={[styles.icon, { justifyContent: "flex-end", marginLeft: "10%" }]}>
                                            <TouchableOpacity onPress={() => {
                                                setName(""); setNameError(!validate("", "name"));
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
                                        value={name}
                                        onChangeText={(value) => {
                                            setNameError(!validate(value, "name"));
                                            setName(value);

                                        }}
                                        placeholder="Name"

                                    />
                                </View>
                                {nameError && (
                                    <View style={styles.errorContainer}>
                                        <Text style={styles.errorText}>
                                            Valid name is required: not null
                                        </Text>
                                    </View>
                                )}


                                <View style={[styles.inputContainer]}>
                                    <View style={styles.icon}>
                                        <Image source={icons.place}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: "red"
                                            }}
                                        />
                                        <View style={[styles.icon, { justifyContent: "flex-end", marginLeft: "10%" }]}>
                                            <TouchableOpacity onPress={() => {
                                                setPhone(''); setPhoneError(!validate("", "phone"));
                                            }}>
                                                <Image source={icons.close1} style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginLeft: 320
                                                }}
                                                />
                                            </TouchableOpacity></View>
                                        
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={phone}
                                        onChangeText={(value) => {
                                            setPhoneError(!validate(value, "phone"));
                                            setPhone(value);
                                        }}

                                        placeholder="Phone"
                                    />
                                </View>
                                {phoneError && (
                                    <View style={styles.errorContainer}>
                                        <Text style={styles.errorText}>
                                            Phone need to have 10 number
                                        </Text>
                                    </View>
                                )}



                                

                                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                                    <Text style={{ color: "white", fontSize: 15 }}>CONFIRMED</Text>
                                </TouchableOpacity>




                            </View>
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

export default EditPersonal
