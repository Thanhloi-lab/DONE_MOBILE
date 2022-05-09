import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,

} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES, icons } from '../../constants'
import { LinearGradient } from "expo-linear-gradient";

import authenticationSlice from '../../stores/Authentication/authenticationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";

const Setting = ({ navigation }) => {
    const dispatch = useDispatch();
    const [mode, setMode] = useState("DARK MODE");
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
                        width: 300
                    }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Setting</Text>
                    </View>

                </View>

                <View style={styles.container}>

                    <TouchableOpacity style={styles.button} value={mode} onPress={() => { (mode === "DARK MODE") ? setMode("LIGHT MODE") : setMode("DARK MODE"); }}>
                        <View style={styles.viewContainer}>
                            <Image source={icons.darkmode} style={styles.imageStyle} />
                            <Text style={{ color: "black", fontSize: 15, ...FONTS.h4 }}>{mode}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChangePassword")}>
                        <View style={styles.viewContainer}>
                            <Image source={icons.password1} style={styles.imageStyle} />
                            <Text style={{ color: "black", fontSize: 15, ...FONTS.h4 }}>CHANGE PASSWORD</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
                        <View style={styles.viewContainer}>
                            <Image source={icons.view} style={styles.imageStyle} />
                            <Text style={{ color: "black", fontSize: 15, ...FONTS.h4 }}>VIEW PROFILE</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        dispatch(authenticationSlice.actions.deleteToken());
                    }}>
                        <View style={styles.viewContainer}>
                            <Image source={icons.exit} style={styles.imageStyle} />
                            <Text style={{ color: "black", fontSize: 15, ...FONTS.h4 }}>LOG OUT</Text>
                        </View>

                    </TouchableOpacity>



                </View>



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
        padding: 20,
        paddingBottom: 70,
        borderTopRightRadius: SIZES.radius * 2,
        borderTopLeftRadius: SIZES.radius * 2,
    },
    button: {
        fontSize: 15,
        backgroundColor: "ivory",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        height: 60,
        marginTop: 20,
        shadowColor: "navy",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    viewContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    imageStyle: {
        height: 25,
        width: 25,
        marginRight: 10
    }
});


export default Setting
