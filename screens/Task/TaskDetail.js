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
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';


const TaskDetail = () => {

    const renderInner = () => (
        <View style={styles.panel}>

            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]} >
                <Image source={icons.editName} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Edit task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]} >
                <Image source={icons.adduser} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Add task's member</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}  >
                <Image source={icons.deleteColor} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Delete this task</Text>
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

    return (
        <SafeAreaView style={{ height: '100%', }}>

            <BottomSheet
                ref={bs}
                snapPoints={[600, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <Animated.View style={{

                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
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
                            onPress={() => bs.current.snapTo(0)}
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
            </Animated.View>
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
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingBottom: 300,
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


export default TaskDetail;