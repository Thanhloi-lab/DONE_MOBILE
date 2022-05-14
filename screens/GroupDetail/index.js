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
    Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../../constants";
import { HorizontalGroupCard, HorizontalProjectCard } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { editGroup } from "../../apis/GroupApi";

const GroupDetail = (props) => {
    const [projects, setProjects] = useState(dummyData.allTask);
    const [modalVisible, setModalVisible] = useState(false);
    const [groupName, setGroupName] = React.useState("");
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    const groupId = props.route.params.groupId;

    const handlePress = () => {
        console.log("aaaaaa");

        props.navigation.navigate("AddMember", { groupId: props.route.params.groupId })

    }

    const bs = React.createRef();
    const fall = new Animated.Value(1);

    const renderInner = () => (
        <View style={styles.panel}>
            <KeyboardAvoidingView style={{ justifyContent: "center", alignItems: "center", paddingBottom: 10 }}>
                <TextInput style={FONTS.h2} placeholder="Name group/project..." />
            </KeyboardAvoidingView>

            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]} >
                <Image source={icons.add} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Create project</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}
                onPress={()=>{
                    console.log("dm mở modal lên")
                    setModalVisible(true);
                    bs.current.snapTo(1);
                }}>
                <Image source={icons.editName} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Edit group name</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]} onPress={handlePress}>
                <Image source={icons.adduser} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Add group's member</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}  >
                <Image source={icons.deleteColor} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Delete this group</Text>
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

    function handleEditGroup(groupName){
        
        var data = {
            NameGroup:groupName,
            IdUser:myId,
            IdGroup:groupId
        }
        var result = editGroup(data);
        result.then(data=>{
            // handleReload()
        })
        .catch(err=>{
            Alert("Tạo nhóm thất bại, thử lại sau");
        })
        
    }

    const modalEditGroupName = () => {
        return (
            <Modal
                style={styles.modalContent}
                animationType="slide"
                transparent={true}
                visible={modalVisible}

                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ ...styles.centeredView, width: '100%' }}>
                    <View style={{ ...styles.modalView, width: '100%' }}>
                        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={keyboardVerticalOffset}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={groupName}
                                    onChangeText={(value) => {
                                        setGroupName(value);
                                    }}
                                    placeholder="Group name...."
                                />
                            </View>
                        </KeyboardAvoidingView>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, { marginRight: 50, marginLeft: 30, width: 120 }]}
                                onPress={() => {
                                    handleEditGroup(groupName);
                                    console.log('edit');
                                }}
                            >
                                <Text style={styles.textStyle}>Edit group</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, { backgroundColor: "black", marginHorizontal: 50, width: 120 }]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }

    

    return (
        <View >
            {modalEditGroupName()}

            <BottomSheet
                ref={bs}
                snapPoints={[690, 0]}
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
                            Group: {projects[0].nameGroup}
                        </Text>
                        <Text>Creator: {projects[0].nameUserCreateGroup}</Text>
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
                            onPress={() => {
                                bs.current.snapTo(0)
                            }}
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
                <View
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,
                    }}
                />
                <FlatList
                    // style={{ paddingBottom:300 }}
                    vertical
                    data={projects}
                    keyExtractor={(item) => item.idTask}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <HorizontalProjectCard
                                containerStyle={{
                                    height: 130,
                                    justifyContent: "center",
                                    marginHorizontal: SIZES.padding,
                                    marginBottom: index === projects.length - 1 ? 200 : SIZES.radius,
                                }}
                                item={item}
                            />
                        );
                    }}
                />
            </Animated.View>
        </View>
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
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        borderWidth: 1,
        borderColor: "#ccc",
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
        paddingBottom: 200
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
    input: {
        height: '100%',
        width: '100%'
    },
    inputContainer: {
        height: 50,
        fontSize: 15,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 25,
        color: "#ccc",
        backgroundColor: "#f7f7f7",
        marginBottom: 10,
        position: "relative",
        flexDirection: "row",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
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
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
});

export default GroupDetail;
