import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    Platform,

} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES, icons } from '../../constants'
import { LinearGradient } from "expo-linear-gradient";
import { useCallback } from "react";


const HelpCenter = ({ navigation }) => {
    const makeCall = () => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${0394653441}';
        } else {
            phoneNumber = 'telprompt:${0394653441}';
        }

        Linking.openURL(phoneNumber);
    };

    const message = "hello nigga!!!"
    const number = '0765167276';

    const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this url: ${url}`);
        }
    }

    const sendTextMessage = useCallback(async (phNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${number}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])

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
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Help Center</Text>
                    </View>

                </View>

                <View style={styles.container}>


                    <TouchableOpacity style={styles.button} onPress={makeCall}>

                        <View style={styles.viewContainer}>
                            <Image source={icons.customerservice} style={styles.imageStyle} />
                            <Text style={{ color: "black", ...FONTS.h4, marginLeft: "5%", fontSize: 14 }}>Contact <Text style={{ color: "blue" }}>Mr.Loi Cao</Text> {'\n'}for more information. {'\n'}Phone number: <Text style={{ color: "green" }}>0394 653 441</Text></Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => sendTextMessage(number, message)}>

                        <View style={styles.viewContainer}>
                            <Image source={icons.smartphone} style={styles.imageStyle} />
                            <Text style={{ color: "black", ...FONTS.h4, marginLeft: "5%", fontSize: 14 }}>Contact <Text style={{ color: "blue" }}>Mr.Do Khang</Text> {'\n'}for more information. {'\n'}SMS number: <Text style={{ color: "green" }}>0765 167 276</Text></Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { Linking.openURL(`fb://facewebmodal/f?href=https://www.facebook.com/thanhhienm4`) }}>

                        <View style={styles.viewContainer}>
                            <Image source={icons.facebook} style={styles.imageStyle} />
                            <Text style={{ color: "black",  ...FONTS.h4, marginLeft: "5%", fontSize: 14 }}>Contact <Text style={{ color: "blue" }}>Mr.Hien Nguyen</Text> {'\n'}for more information. {'\n'}FB: <Text style={{ color: "green" }}>facebook.com/thanhhienm4</Text></Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { Linking.openURL(`mailto:ntdtestmail@gmail.com?subject=DoneApp&body=${message}`) }}>

                        <View style={styles.viewContainer}>
                            <Image source={icons.sendemail} style={styles.imageStyle} />
                            <Text style={{ color: "black",  ...FONTS.h4, marginLeft: "5%", fontSize: 14 }}>Contact <Text style={{ color: "blue" }}>Mr.Duy Nguyen</Text> {'\n'}for more information. {'\n'}Mail: <Text style={{ color: "green" }}>ntdtestmail@gmail.com</Text></Text>
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
        backgroundColor: "lightcyan",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        height: 100,
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
        justifyContent: "flex-start",
        alignItems: "center"

    },
    imageStyle: {
        height: 50,
        width: 50,
    }
});


export default HelpCenter
