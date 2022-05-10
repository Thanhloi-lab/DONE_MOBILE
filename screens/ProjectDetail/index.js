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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, dummyData, SIZES } from "../../constants";
import { HorizontalTaskCard } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
const ProjectDetail = (props) => {
    const [projects, setProjects] = useState(dummyData.allTask);
    const [modalVisible, setModalVisible] = useState(false);

    const projectId = props.route.params.projectId;
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <KeyboardAvoidingView>
                            <TextInput placeholder="Name edit project..." />
                        </KeyboardAvoidingView>
                        <Pressable
                            style={[styles.button, styles.buttonClose, { marginTop: 10 }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Edit project's name</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose, { backgroundColor: "green", }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Create task</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose, { backgroundColor: "green", }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Add project member</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose, { backgroundColor: "red", }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Delete this project</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose, { backgroundColor: "black", }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={modalVisible && { opacity: 0.2 }}>
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
                            onPress={() => setModalVisible(true)}
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
            </View>
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
});

export default ProjectDetail;
