import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES, icons } from '../../constants'

const TaskDetail = () => {
    return (
        <SafeAreaView style={{ height: '100%', paddingTop:70 }}>
            <ScrollView style={{ flexDirection: 'column' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        style={{
                            ...FONTS.h3,
                            fontSize: 50,
                            lineHeight: 50,
                            color: COLORS.primary
                        }}
                    >
                        Detail
                    </Text>

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
                        <Text style={{ color: COLORS.darkGray1, ...FONTS.body3, lineHeight:30 }}>
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
                        marginTop:20,
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

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom:30}}>
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
        </SafeAreaView>

    )
}

export default TaskDetail;