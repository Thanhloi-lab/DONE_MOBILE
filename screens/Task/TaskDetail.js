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
    Alert,
    FlatList,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, SIZES, icons } from '../../constants'
import { SelectItem } from "../../components";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from "react-redux";
import jobsSlice from "../../stores/Job/jobsSlice";
import { allTaskOfUser, deleteTask, removeTaskMembers, addTaskMembers } from "../../apis/TaskApi";
import { getUserByText, getUserByTaskId } from "../../apis/UserApi";
import { updateStatus } from "../../apis/TaskApi";
const TaskDetail = (props) => {
    // console.log([props])
    const dispatch = useDispatch();
    const projectId = props.route.params.item[0].idProject;
    const taskId = props.route.params.item[0].idTask;
    const userName = props.route.params.item[0].nameUserCreateProject;
    const taskName = props.route.params.item[0].nameTask;
    const taskDeadline = props.route.params.item[0].deadline;
    const taskContent = props.route.params.item[0].content;
    const taskStatus = props.route.params.item[0].statusId;
    const myId = useSelector((state) => state.authentication.id);
    const [modalDeleteTaskVisible, setModalDeleteTaskVisible] = useState(false);


    const [modalAddTaskMemberVisible, setModalAddTaskMemberVisible] = useState(false);
    const [modalEditTaskMemberVisible, setModalEditTaskMemberVisible] = useState(false);
    const [modalDeleteUserVisible, setModalDeleteUserVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [task, setTask] = useState({});
    const [searchText, setSearchText] = useState("");
    const [userId, setUserId] = useState("");
    const [userChoosen, setUserChoosen] = useState("");


    function handleReload() {
        allTaskOfUser(myId).then(data => {
            dispatch(jobsSlice.actions.setTask(data));
        })
            .catch(err => console.error(err))


    }

    function handleUpdateStatus() {
        var data = {
            IdTask: taskId,
            IdStatus: 2,
        }
        var result = updateStatus(data);
        result.then(response => {
            handleReload()
        })
            .catch(err => {
                console.log(err.message())
            })

    }



    function handleDeleteTask() {
        var data = {
            IdUser: myId,
            IdSth: taskId
        }

        var result = deleteTask(data);
        result.then(response => {
            handleReload()
            Alert.alert("delete success");
            props.navigation.goBack()

        })
            .catch(err => {
                console.log(err)
            })
    }

    const modalDeleteProject = () => {
        return (
            <Modal
                style={styles.modalContent}
                animationType="slide"
                transparent={true}
                visible={modalDeleteTaskVisible}

                onRequestClose={() => {
                    setModalDeleteTaskVisible(!modalDeleteTaskVisible);
                }}
            >
                <View style={{ ...styles.centeredView, width: '100%' }}>
                    <View style={{ ...styles.modalView, width: '100%' }}>
                        <View>
                            <Text style={{ fontSize: 15 }}>Are you really want to delete this task?</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, {
                                    marginRight: 50,
                                    marginLeft: 30,
                                    width: 120,
                                    backgroundColor: COLORS.primary
                                }]}
                                onPress={() => {
                                    handleDeleteTask();
                                    setModalDeleteTaskVisible(!modalDeleteTaskVisible)
                                }}
                            >

                                <Text style={styles.textStyle}>Delete</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, { backgroundColor: "black", marginHorizontal: 50, width: 120 }]}
                                onPress={() => setModalDeleteTaskVisible(!modalDeleteTaskVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }


    const renderInner = () => (
        <View style={styles.panel}>

            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]} onPress={() => {
                props.navigation.navigate("EditTask", {
                    projectId: projectId,
                    taskId: taskId,
                    userName: userName,
                    taskName: taskName,
                    taskDeadline: taskDeadline,
                    taskContent: taskContent,
                    taskStatus: taskStatus,
                })
            }
            }>
                <Image source={icons.editName} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Edit task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]} onPress={() => {
                bs.current.snapTo(1);
                setModalAddTaskMemberVisible(true);
            }}>
                <Image source={icons.adduser} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Add task's member</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}
                onPress={() => {
                    bs.current.snapTo(1);
                    handleLoadUser();
                    setModalEditTaskMemberVisible(true);
                }}
            >
                <Image source={icons.adduser} style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Edit task's member</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}
                onPress={() => {
                    setModalDeleteTaskVisible(true);
                    bs.current.snapTo(1);
                }}>
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



    function renderSearch(callback) {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                <View
                    style={{
                        flexDirection: "row",
                        height: 40,
                        alignItems: "center",
                        marginHorizontal: SIZES.padding,
                        marginRight: 5,
                        marginVertical: SIZES.base,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2,
                        width: '80%'
                    }}
                >

                    {/* Text input */}
                    <TextInput
                        style={{
                            flex: 1,
                            marginLeft: SIZES.radius,
                            ...FONTS.body3,
                        }}
                        value={searchText}
                        onChangeText={(value) => {
                            setSearchText(value);
                        }}
                        placeholder="Search user...."
                    />

                </View>

                <View style={{
                    flex: 1,
                    height: 40,
                    marginRight: 5,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <TouchableOpacity onPress={() => callback()}>
                        <Image
                            source={icons.search}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

    function handleAddMember() {
        var selectUsers = users.filter(x => x.isSelected);
        var IdMember = [];
        selectUsers.forEach(x => {
            IdMember.push({
                Id: x.Id
            })
        });
        if (IdMember.length === 0) {
            Alert.alert("Vui lòng chọn đối tượng!");
            return;
        }
        var data = {
            IdMember,
            IdTask: taskId,
            IdUser: myId
        }

        var result = addTaskMembers(data);
        result
            .then(response => {

                setUsers([]);
                setModalAddTaskMemberVisible(!modalAddTaskMemberVisible);
                Alert.alert(response.resultObject);
            })
            .catch(err => {
                Alert.alert("Thêm thất bại.");
            })
        setSearchText("");
    }

    function handleLoadUser() {
        getUserByTaskId(taskId).then(data => {
            // var matchUsers = [];
            // data.forEach(x => {
            //     matchUsers.push({
            //         Id: x.idUser,
            //         Name: x.name,
            //         Mail: x.mail,
            //         isSelected: false,
            //     })
            // });
            setUsers(data)
        })
            .catch(err => console.error(err))

    }

    function handleSearchUser() {
        getUserByText(searchText).then(data => {
            var matchUsers = [];
            data.forEach(x => {
                matchUsers.push({
                    Id: x.idUser,
                    Name: x.name,
                    Mail: x.mail,
                    isSelected: false,
                })
            });

            setUsers(matchUsers)
        })
            .catch(err => console.error(err))

    }

    const modalAddMember = () => {
        return (
            <Modal
                style={styles.modalContent}
                animationType="slide"
                transparent={true}
                visible={modalAddTaskMemberVisible}

                onRequestClose={() => {
                    setModalAddTaskMemberVisible(!modalAddTaskMemberVisible);
                }}
            >
                <View style={{ ...styles.centeredView, width: '100%' }}>
                    <View style={{ ...styles.modalView, width: '100%', height: (SIZES.height * 70 / 100) }}>
                        {renderSearch(handleSearchUser)}

                        <View style={{ flex: 1 }}>
                            <FlatList
                                vertical
                                data={users}
                                keyExtractor={(item) => item.Id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <SelectItem
                                            containerStyle={{
                                                width: '100%',
                                                justifyContent: "center",
                                                marginHorizontal: SIZES.padding,
                                            }}
                                            item={item}
                                        />
                                    );
                                }}
                            />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, {
                                    marginRight: 50,
                                    marginLeft: 30,
                                    width: 120,
                                    backgroundColor: COLORS.primary
                                }]}
                                onPress={() => {

                                    handleAddMember();
                                }}
                            >

                                <Text style={styles.textStyle}>Confirm</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, { backgroundColor: "black", marginHorizontal: 50, width: 120 }]}
                                onPress={() => {
                                    setModalAddTaskMemberVisible(!modalAddTaskMemberVisible);
                                    setSearchText("");
                                    setUsers([]);
                                }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }

    const modalEditMember = () => {
        return (
            <Modal
                style={styles.modalContent}
                animationType="slide"
                transparent={true}
                visible={modalEditTaskMemberVisible}

                onRequestClose={() => {
                    setModalEditTaskMemberVisible(!modalEditTaskMemberVisible);
                }}
            >
                <View style={{ ...styles.centeredView, width: '100%' }}>
                    <View style={{ ...styles.modalView, width: '100%', height: (SIZES.height * 70 / 100) }}>
                        {renderSearch(handleLoadUser)}

                        <View style={{ width: '100%', flex: 1 }}>
                            <FlatList
                                vertical
                                data={users}
                                keyExtractor={(item) => item.idUser}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity
                                            onLongPress={() => {
                                                setUserChoosen(item.idUser);
                                                setModalDeleteUserVisible(true)
                                            }}
                                        >
                                            <View style={{
                                                width: '100%',
                                                backgroundColor: COLORS.lightGray2,
                                                marginVertical: 2,
                                                borderRadius: SIZES.radius
                                            }}>
                                                <View style={{ flex: 1, padding: 10 }} numberOfLines={1}>
                                                    {/* name */}
                                                    <Text style={{ ...FONTS.h2, fontSize: 16, lineHeight: 16 }}>
                                                        {item.mail}
                                                    </Text>

                                                    {/* description */}
                                                    <Text style={{ color: COLORS.darkGray1, ...FONTS.body4, fontSize: 15, lineHeight: 15 }} numberOfLines={1}>
                                                        {item.name}
                                                    </Text>

                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            {/* <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, {
                                    marginRight: 50,
                                    marginLeft: 30,
                                    width: 120,
                                    backgroundColor: COLORS.primary
                                }]}
                                onPress={() => {
                                    handleAddMember();
                                }}
                            >

                                <Text style={styles.textStyle}>Confirm</Text>

                            </TouchableOpacity> */}

                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, { backgroundColor: "black", width: 120 }]}
                                onPress={() => {
                                    setModalEditTaskMemberVisible(!modalEditTaskMemberVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }

    const modalDeleteUser = () => {
        return (
            <Modal
                style={styles.modalContent}
                animationType="slide"
                transparent={true}
                visible={modalDeleteUserVisible}

                onRequestClose={() => {
                    setModalDeleteUserVisible(!modalDeleteUserVisible);
                }}
            >
                <View style={{ ...styles.centeredView, width: '100%' }}>
                    <View style={{ ...styles.modalView, width: '100%' }}>
                        <View>
                            <Text style={{ fontSize: 15 }}>Are you really want to delete this user?</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, {
                                    marginRight: 50,
                                    marginLeft: 30,
                                    width: 120,
                                    backgroundColor: COLORS.primary
                                }]}
                                onPress={() => {
                                    //console.log([users])
                                    handleDeleteUser();
                                    setModalDeleteUserVisible(!modalDeleteUserVisible)
                                }}
                            >

                                <Text style={styles.textStyle}>Delete</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, { backgroundColor: "black", marginHorizontal: 50, width: 120 }]}
                                onPress={() => setModalDeleteUserVisible(!modalDeleteUserVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }

    const handleDeleteUser = () => {
        var data = {
            IdUser: myId,
            IdSth: userChoosen,
            IdTask: taskId
        }
        var result = removeTaskMembers(data);
        result.then(response => {
            // handleReload()
            setUserChoosen("");
            if (response.isSuccessed) {
                handleLoadUser();
                Alert.alert(response.resultObject);
            }
            else {
                Alert.alert(response.message);
            }

        })
            .catch(err => {
                console.log(err);
                Alert.alert("Xóa thất bại");
            })
    }



    return (
        <SafeAreaView style={{ height: '100%', }}>
            {modalDeleteProject()}
            {modalAddMember()}
            {modalEditMember()}
            {modalDeleteUser()}
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
                            Task: {taskName}
                        </Text>
                        <Text>Creator:{userName} </Text>
                    </View>
                    {myId == props.route.params.item[0].userCreateProject &&
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
                    }

                </View>
                <ScrollView style={{ flexDirection: 'column', marginBottom: 100 }}>

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
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>My task: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].nameTask}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>Description: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].content}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>Created date: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].taskCreateDate}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>Deadline: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].deadline}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderBottomLeftRadius: SIZES.radius,
                                borderBottomRightRadius: SIZES.radius,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>Updated date: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].updateDate}</Text>
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
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>Project: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].nameProject}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>MailUserProject: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].mailUserCreateProject}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>Created date: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].projectCreateDate}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderBottomLeftRadius: SIZES.radius,
                                borderBottomRightRadius: SIZES.radius,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>NameUserProject: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].nameUserCreateProject}</Text>
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
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>Group: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].nameGroup}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>MailUserGroup: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].mailUserCreateGroup}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>PhoneUserGroup: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].phoneUserCreateGroup}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderBottomLeftRadius: SIZES.radius,
                                borderBottomRightRadius: SIZES.radius,
                            }}
                            >
                                <Text style={{ ...FONTS.h3, fontSize: 18, lineHeight: 18, color: COLORS.primary }}>UserCreateGroup: </Text>
                                <Text style={{ ...FONTS.body3, fontSize: 18, lineHeight: 18, flexShrink: 1 }}>{props.route.params.item[0].nameUserCreateGroup}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                        { taskStatus==1 && 
                            <TouchableOpacity onPress={() => { handleUpdateStatus(), props.navigation.goBack() }} >
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
                        }
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
    modalContent: {
        height: '100%'
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


export default TaskDetail;