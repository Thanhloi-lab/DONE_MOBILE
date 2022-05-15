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
    Alert,
    ToastAndroid
} from "react-native";

import {
    Title,
    Caption,

} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import React from "react";
import { COLORS, FONTS, SIZES, icons, dummyData } from '../../constants'


import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { validate } from "../../util/validation";

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';


import { API_URL, editAvatar, getUserInfo, getUserInfoById } from "../../apis/UserApi";
import { useDispatch, useSelector } from "react-redux";
import authenticationSlice from "../../stores/Authentication/authenticationSlice";


const Profile = ({ navigation }) => {
    const user = useSelector(state=>state.authentication)
    const [image, setImage] = useState(user.info.avatar);
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            updateAvatar(result)
        }

    };

    const lanchCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        console.log(test);
        if (!result.cancelled) {
            setImage(result.uri);
        }

    };

    const updateAvatar = async (result) =>{
        // ImagePicker saves the taken photo to disk and returns a local URI to it
       let localUri = result.uri;
       let filename = localUri.split('/').pop();

       // Infer the type of the image
       let match = /\.(\w+)$/.exec(filename);
       let type = match ? `image/${match[1]}` : `image`;

        const data = { uri: localUri, name: filename, type };

        const res = await editAvatar({id: user.info.idUser, avatar: data})
        if(res.status === 200){
            ToastAndroid.showWithGravity(
                `Info Updated`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
                );
            const userRes =  await getUserInfoById(user.info.idUser)
            const userJson = await userRes.json()
            dispatch(authenticationSlice.actions.setToken({token:user.token,id:user.id, info: userJson}))
                
        }
    }



    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={lanchCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={pickImage} >
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const bs = React.createRef();
    const fall = new Animated.Value(1);




    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary2]}
            style={styles.gradientContainer}
        >

            <View style={{ width: '100%', height: '100%' }}>
                <BottomSheet
                    ref={bs}
                    snapPoints={[330, 0]}
                    renderContent={renderInner}
                    renderHeader={renderHeader}
                    initialSnap={1}
                    callbackNode={fall}
                    enabledGestureInteraction={true}
                />
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
                                borderWidth: 2
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        alignItems: "center",
                        width: "80%"
                    }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Profile</Text>
                    </View>

                </View>

                <Animated.View style={{

                    opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
                }}>
                    <ScrollView style={{ flexDirection: 'column' }}>
                        <View style={styles.container}>

                            <View style={{ alignItems: 'center', marginBottom: 30, marginTop: 40 }}>
                                <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                                    <View style={{
                                        height: 100,
                                        width: 100,
                                        borderRadius: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <ImageBackground
                                            source={typeof (image) === 'string' ? {uri: !image.startsWith("file") ? API_URL + "/"+  image: image} : image}
                                            style={{ height: 130, width: 130, borderWidth: 2, borderRadius: 30, borderColor: COLORS.gray }}
                                            imageStyle={{ borderRadius: 30 }}>
                                            <View style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: "flex-end",
                                                flexDirection: "row",
                                                marginTop: 90,
                                                marginRight: 5
                                            }}>
                                                <Icon
                                                    name="camera"
                                                    size={30}
                                                    color="#fff"
                                                    style={{
                                                        opacity: 0.7,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderWidth: 1,
                                                        borderColor: '#fff',
                                                        borderRadius: 10,

                                                    }} />
                                            </View>
                                        </ImageBackground>
                                        <Title style={[styles.title, {
                                            marginTop: 15,
                                            marginBottom: 5,
                                            ...FONTS.h2
                                        }]}>@{user.info.name}</Title>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.infoContainer}>
                                <View style={{

                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{ color: "gray" }}>Personal Information</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("EditPersonal")}>
                                        <Text style={styles.button}>EDIT INFO</Text>
                                    </TouchableOpacity>
                                </View>
                                <View >
                                    <View style={styles.detail}>
                                        <Image source={icons.user1} style={styles.icon} />
                                        <Text>Name:         <Text style={{ ...FONTS.h4 }}>{user.info.name}</Text></Text>
                                    </View>
                                    <View style={styles.detail}>
                                        <Image source={icons.phone1} style={styles.icon} />
                                        <Text>Phone:          <Text style={{ ...FONTS.h4 }}>{user.info.phone}</Text></Text>
                                    </View>
                                    
                                </View>
                            </View>

                            

                        </View>

                    </ScrollView>
                </Animated.View>
            </View >



        </LinearGradient >


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
        paddingTop: 10,
        borderTopLeftRadius: SIZES.radius * 2,
        borderTopRightRadius: SIZES.radius * 2,
        paddingBottom: 30

    },
    infoContainer: {
        backgroundColor: "snow",
        width: "100%",
        marginTop: 20,
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    detail: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 15
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 5,
        marginLeft: 10,
        tintColor: "red"
    },
    button: {
        color: "blue",
        fontSize: 17,
        padding: 5,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        ...FONTS.h4
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Profile
