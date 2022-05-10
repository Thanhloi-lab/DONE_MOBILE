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
                            <Text style={{ color: "black", fontSize: 15, ...FONTS.h4, marginLeft: "5%" }}>Contact <Text style={{ color: "blue" }}>Mr.Loi Cao</Text> {'\n'}for more information. {'\n'}Phone number: <Text style={{ color: "green" }}>0394 653 441</Text></Text>
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
        justifyContent: "center",
        alignItems: "center"

    },
    imageStyle: {
        height: 50,
        width: 50,
        tintColor: "red",

    }
});


export default HelpCenter
