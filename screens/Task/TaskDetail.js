import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    KeyboardAvoidingView,
    Pressable,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, SIZES, icons } from '../../constants'

const TaskDetail = () => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={{ height: '100%', }}>

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

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Edit this task</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose, { backgroundColor: "green", }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Add task member</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.buttonClose, { backgroundColor: "red", }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Delete this task</Text>
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
                <View style={{ marginHorizontal: 10, paddingVertical: 10, position: 'relative', }}>

                    <View
                        style={{

                            backgroundColor: 'white',
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
                            Task: temp
                        </Text>
                        <Text>Creator: temp</Text>
                    </View>
                    <View style={{
                        top: 0,
                        right: 0,
                        position: "absolute",
                        elevation: 8,
                    }}>
                        <TouchableOpacity
                            style={{
                                borderRadius: 50,
                                width: 40,
                                height: 40,
                                backgroundColor: COLORS.primary,
                                flexDirection: "row",
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
                                    flex: 1
                                }}
                            >
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <ScrollView style={{ flexDirection: 'column' }}>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: "absolute",
                            top: 25,
                            left: 0,
                            padding: 20
                        }}>
                            <Image
                                source={icons.unCompleted}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 5
                                }}

                            />
                            <Text style={{ color: COLORS.darkGray1, ...FONTS.body3, lineHeight: 30 }}>
                                UNCOMPLETED
                            </Text>
                        </View>


                    </View>
                    <View style={{ marginVertical: 20, marginHorizontal: 14 }}>
                        <View style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,
                            elevation: 7,
                            borderRadius: SIZES.radius,
                            marginBottom: 30,
                            backgroundColor: COLORS.primary1,
                            marginTop: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderTopLeftRadius: SIZES.radius,
                                borderTopRightRadius: SIZES.radius,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>My task: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Task</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Description: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Description</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Created date: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Created date</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Deadline: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Deadline</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderBottomLeftRadius: SIZES.radius,
                                borderBottomRightRadius: SIZES.radius,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Updated date: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Updated date</Text>
                            </View>
                        </View>


                        <View style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,
                            elevation: 7,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.COMPLETED,
                            marginBottom: 30,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderTopLeftRadius: SIZES.radius,
                                borderTopRightRadius: SIZES.radius,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Project: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Project</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Description: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Description</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Created date: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Created date</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Deadline: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Deadline</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderBottomLeftRadius: SIZES.radius,
                                borderBottomRightRadius: SIZES.radius,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Updated date: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Updated date</Text>
                            </View>
                        </View>

                        {/* GROUP */}
                        <View style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,
                            elevation: 7,
                            borderRadius: SIZES.radius,
                            marginBottom: 30,
                            backgroundColor: COLORS.UNCOMPLETED
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderTopLeftRadius: SIZES.radius,
                                borderTopRightRadius: SIZES.radius,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Group: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Group</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Description: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Description</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Created date: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Created date</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Deadline: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Deadline</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderBottomLeftRadius: SIZES.radius,
                                borderBottomRightRadius: SIZES.radius,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 20, lineHeight: 20, color: COLORS.primary }}>Updated date: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 20, lineHeight: 20, flexShrink: 1 }}>Updated date</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                        <TouchableOpacity>
                            <View style={{
                                backgroundColor: COLORS.COMPLETED1,
                                margin: 10,
                                marginTop: 0,
                                paddingVertical: 15,
                                paddingHorizontal: 15,
                                borderRadius: SIZES.radius,
                                flexDirection: 'row',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.29,
                                shadowRadius: 4.65,
                                elevation: 7,
                                borderRadius: SIZES.radius * 1.5,
                            }}>
                                <Image
                                    source={icons.completed}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 5
                                    }}
                                />
                                <Text style={{ ...FONTS.h3 }}>
                                    Confirm completed
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        borderWidth: 3,
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


export default TaskDetail;