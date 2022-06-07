import React, { useState, useEffect } from "react";
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
    Platform,
    Alert,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../../constants";
import { HorizontalGroupCard, HorizontalProjectCard, SelectItem } from "../../components";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { editGroup, deleteGroup, allUserGroup, addGroupMembers, getGroupById, removeGroupMembers } from "../../apis/GroupApi";
import { createProject, allProjectByGroupId } from "../../apis/ProjectApi";
import { getUserByText, getUserByGroupId } from "../../apis/UserApi";
import jobsSlice from "../../stores/Job/jobsSlice";
import { useSelector, useDispatch } from "react-redux";

const GroupDetail = (props) => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [group, setGroup] = useState({});
    const [searchText, setSearchText] = useState("");
    const [userId, setUserId] = useState("");


    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleProject, setModalVisibleProject] = useState(false);
    const [modalDeleteGroupVisible, setModalDeleteGroupVisible] = useState(false);
    const [modalAddGroupMemberVisible, setModalAddGroupMemberVisible] = useState(false);
    const [modalEditGroupMemberVisible, setModalEditGroupMemberVisible] = useState(false);
    const [modalDeleteUserVisible, setModalDeleteUserVisible] = useState(false);

    const [groupName, setGroupName] = React.useState("");
    const [projectName, setProjectName] = React.useState("");
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    const groupId = props.route.params.groupId;
    const user = useSelector((state) => state.authentication.user);

    const bs = React.createRef();
    const fall = new Animated.Value(1);

    useEffect(() => {
        // handleReload();

        const willFocusSubscription = props.navigation.addListener('focus', () => {
            handleReload();
        });

        return willFocusSubscription;
    }, [])

    const handleReload = () => {
        // allProjectByGroupId(groupId, user.token).then(data => {
        //     setProjects(data)
        // })
        //     .catch(err => console.error(err))

        getGroupById(groupId, user.token).then(data => {
            setGroup(data)
        })
            .catch(err => console.error(err))
    }

    const renderInner = () => (
        <View style={styles.panel}>
            {/* <KeyboardAvoidingView style={{ justifyContent: "center", alignItems: "center", paddingBottom: 10 }}>
                <TextInput style={FONTS.h2} placeholder="Name group/project..." />
            </KeyboardAvoidingView> */}

            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}
                onPress={() => {
                    setModalVisibleProject(true);
                    bs.current.snapTo(1);
                }}>
                <Image source={icons.add} style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Create project</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}
                onPress={() => {
                    setModalVisible(true);
                    bs.current.snapTo(1);
                }}>
                <Image source={icons.editName} style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Edit group name</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}
                onPress={() => {
                    bs.current.snapTo(1);
                    setModalAddGroupMemberVisible(true);
                }}
            >
                <Image source={icons.adduser} style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Add group's member</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}
                onPress={() => {
                    bs.current.snapTo(1);
                    handleLoadUser();
                    setModalEditGroupMemberVisible(true);
                }}
            >
                <Image source={icons.adduser} style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Edit group's member</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}
                onPress={() => {
                    setModalDeleteGroupVisible(true);
                    bs.current.snapTo(1);
                }}>
                <Image source={icons.deleteColor} style={{ width: 20, height: 20, marginRight: 10 }} />
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

    function handleDeleteGroup() {
        var data = {
            IdUser: user.idUser,
            IdSth: groupId
        }
        var result = deleteGroup(data, user.token);
        result.then(response => {
            // handleReload()
            setGroupName("");
            if (response.isSuccessed) {
                Alert.alert(response.resultObject);
                allUserGroup(user.idUser, user.token).then(data => {
                    dispatch(jobsSlice.actions.setGroup(data));
                })
                    .catch(err => console.error(err))

                props.navigation.goBack();
            }
            else {
                Alert.alert(response.message);
            }


        })
            .catch(err => {
                Alert.alert("Xóa thất bại");
            })
    }

    function handleEditGroup(groupName) {
        var data = {
            GroupName: groupName,
            IdUser: user.idUser,
            IdGroup: groupId
        }
        var result = editGroup(data, user.token);
        result.then(response => {
            // handleReload()
            setGroupName("");
            handleReload();
            if (response.isSuccessed) {
                Alert.alert(response.resultObject);
            }
            else {
                Alert.alert(response.message);
            }
        })
            .catch(err => {
                Alert.alert("Sửa thất bại")
            })
    }

    function handleCreateProject(projectName) {

        var data = {
            IdGroup: groupId,
            IdUser: user.idUser,
            NameProject: projectName,
        }
        var result = createProject(data, user.token);
        result.then(response => {
            setProjectName("");
            handleReload();

            Alert.alert("create success");

        })
            .catch(err => {
                Alert.alert(err);
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
                                    var NameGroup = groupName.trim();

                                    if (NameGroup === "" || !NameGroup || NameGroup === null) {
                                        Alert.alert(
                                            "Thông báo",
                                            "Không để trống tên nhóm");
                                    } else {

                                        handleEditGroup(groupName);
                                        setModalVisible(!modalVisible)
                                    }
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

    const modalCreateProject = () => {
        return (
            <Modal
                style={styles.modalContent}
                animationType="slide"
                transparent={true}
                visible={modalVisibleProject}

                onRequestClose={() => {
                    setModalVisibleProject(!modalVisibleProject);
                }}
            >
                <View style={{ ...styles.centeredView, width: '100%' }}>
                    <View style={{ ...styles.modalView, width: '100%' }}>
                        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={keyboardVerticalOffset}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={projectName}
                                    onChangeText={(value) => {
                                        setProjectName(value);
                                    }}
                                    placeholder="Project name...."
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
                                    var NameProject = projectName.trim();

                                    if (NameProject === "" || !NameProject || NameProject === null) {
                                        Alert.alert(
                                            "Alert",
                                            "Project name not null");
                                    } else {
                                        handleCreateProject(projectName);
                                        setModalVisibleProject(!modalVisibleProject)
                                    }
                                }}
                            >

                                <Text style={styles.textStyle}>Create project</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, { backgroundColor: "black", marginHorizontal: 50, width: 120 }]}
                                onPress={() => setModalVisibleProject(!modalVisibleProject)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }

    const modalDeleteGroup = () => {
        return (
            <Modal
                style={styles.modalContent}
                animationType="slide"
                transparent={true}
                visible={modalDeleteGroupVisible}

                onRequestClose={() => {
                    setModalDeleteGroupVisible(!modalDeleteGroupVisible);
                }}
            >
                <View style={{ ...styles.centeredView, width: '100%' }}>
                    <View style={{ ...styles.modalView, width: '100%' }}>
                        <View>
                            <Text style={{ fontSize: 15 }}>Delete group will delete all projects in group. Are you really want to delete group?</Text>
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
                                    handleDeleteGroup();
                                    setModalDeleteGroupVisible(!modalDeleteGroupVisible)
                                }}
                            >

                                <Text style={styles.textStyle}>Delete</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, { backgroundColor: "black", marginHorizontal: 50, width: 120 }]}
                                onPress={() => setModalDeleteGroupVisible(!modalDeleteGroupVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }

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
        var IdMembers = [];
        selectUsers.forEach(x => {
            IdMembers.push({
                Id: x.Id
            })
        });
        if (IdMembers.length === 0) {
            Alert.alert("Vui lòng chọn đối tượng!");
            return;
        }
        var data = {
            IdMembers,
            IdGroup: groupId,
            IdUser: user.idUser
        }
        //console.log([data])
        var result = addGroupMembers(data, user.token);
        result
            .then(response => {
                setUsers([]);
                setModalAddGroupMemberVisible(!modalAddGroupMemberVisible);
                Alert.alert(response.resultObject);
            })
            .catch(err => {
                Alert.alert("Thêm thất bại.");
            })
        setSearchText("");
    }

    function handleLoadUser() {
        getUserByGroupId(groupId, user.token).then(data => {
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
        getUserByText(searchText, user.token).then(data => {
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
                visible={modalAddGroupMemberVisible}

                onRequestClose={() => {
                    setModalAddGroupMemberVisible(!modalAddGroupMemberVisible);
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
                                    setModalAddGroupMemberVisible(!modalAddGroupMemberVisible);
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
                visible={modalEditGroupMemberVisible}

                onRequestClose={() => {
                    setModalEditGroupMemberVisible(!modalEditGroupMemberVisible);
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
                                                setUserId(item.idUser);
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
                                    setModalEditGroupMemberVisible(!modalEditGroupMemberVisible);
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
            IdUser: user.idUser,
            IdSth: userId,
            IdGroup: groupId
        }
        var result = removeGroupMembers(data, user.token);
        result.then(response => {
            // handleReload()
            setUserId("");
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
        <View >
            {modalEditGroupName()}
            {modalCreateProject()}
            {modalDeleteGroup()}
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

                opacity: Animated.add(1, Animated.multiply(fall, 1.0)),
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
                            Group: {group.nameGroup}
                        </Text>
                        <Text>Creator: {group.mail}</Text>
                    </View>
                    {group.createUser == user.idUser &&
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
                    }

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
                    style={{ height: '100%', }}
                    vertical
                    data={projects}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <HorizontalProjectCard
                                containerStyle={{
                                    justifyContent: "center",
                                    marginHorizontal: SIZES.padding,
                                    marginBottom: index === projects.length - 1 ? 200 : SIZES.radius,
                                }}
                                item={item}
                                onPress={() => {
                                    props.navigation.navigate("ProjectDetail", {
                                        projectId: item.idProject,
                                        projectName: item.nameProject,
                                        createName: item.nameUserCreateProject,
                                        userId: item.createUser,
                                        userName: item.mail,
                                    });
                                }}
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
        padding: 20,
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
        height: '100%',
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
        marginVertical: 4,
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
    modalContent: {
        height: '100%',

    }
});

export default GroupDetail;
