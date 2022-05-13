import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    Modal,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    TextInput,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, dummyData, SIZES, FONTS, icons } from "../../constants";
import { HorizontalTaskCard } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';


const ProjectDetail = (props) => {
    const [projects, setProjects] = useState(dummyData.allTask);
    const renderInner = () => (
        <View style={styles.panel}>
            <KeyboardAvoidingView style={{ justifyContent: "center", alignItems: "center", paddingBottom: 10 }}>
                <TextInput style={FONTS.h2} placeholder="Name project..." />
            </KeyboardAvoidingView>

            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "dodgerblue" }]} >
                <Image source={icons.editName} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Edit project's name</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "mediumseagreen" }]} >
                <Image source={icons.add} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Create task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "mediumseagreen" }]} >
                <Image source={icons.adduser} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Add project's member</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "crimson" }]}  >
                <Image source={icons.deleteColor} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Delete this project</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.panelButton, { backgroundColor: "darkgray" }]}
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
    const projectId = props.route.params.projectId;
    return (
        <>
            <BottomSheet
                ref={bs}
                snapPoints={[460, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <Animated.View style={{

                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
                <View style={{ marginHorizontal: 10, paddingVertical: 10, position: 'relative' }}>

                    <View
                        style={{
                            backgroundColor: COLORS.primary1,
                            borderRadius: SIZES.radius,
                            paddingVertical: 10,
                            paddingHorizontal: 15,

                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,
                            elevation: 7,
                        }}
                    >
                        <Text style={{ fontSize: SIZES.h2, fontWeight: "bold" }}>
                            Project: {projects[0].nameProject}
                        </Text>
                        <Text>Creator: {projects[0].nameUserCreateProject}</Text>
                    </View>

                    <View style={{ position: 'absolute', top: 0, right: 0, elevation: 8 }}>
                        <TouchableOpacity
                            style={{
                                borderRadius: 50,
                                width: 40,
                                height: 40,
                                backgroundColor: COLORS.primary,
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",

                            }}
                            onPress={() => bs.current.snapTo(0)}
                        >
                            <Text
                                style={{
                                    fontSize: 30,
                                    color: "white",
                                    textAlign: "center",
                                    textAlignVertical: "center",

                                }}
                            >
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    // style={{ flex: 1 }}
                    vertical
                    data={projects}
                    keyExtractor={(item) => item.idTask}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <HorizontalTaskCard
                                containerStyle={{
                                    justifyContent: "center",
                                    marginHorizontal: SIZES.padding,
                                    marginBottom:
                                        index == projects.length - 1 ? 200 : SIZES.radius,
                                }}
                                item={item}
                            />
                        );
                    }}
                />
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        borderWidth: 3,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        marginBottom: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
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
        flexDirection: "row",
        justifyContent: "center"
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ProjectDetail;
