import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Image,
    Modal,
    Alert,
    Platform,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { COLORS, dummyData, SIZES, FONTS, icons } from "../../constants";
import { HorizontalTaskCard, SelectItem } from "../../components";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from "react-redux";
import jobsSlice from "../../stores/Job/jobsSlice";
import { allTaskOfUser, allTaskByProject } from "../../apis/TaskApi";
import { editProject, deleteProject, allUserProject, removeProjectMembers, addProjectMembers } from "../../apis/ProjectApi";
import { getUserByText, getUserByProjectId } from "../../apis/UserApi";

const ProjectDetail = (props) => {

    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const bs = React.createRef();
    const fall = new Animated.Value(1);

    const projectId = props.route.params.projectId;
    const user = useSelector((state) => state.authentication.user);
    const allTask = useSelector((state) => state.jobs.allTask);
    const projects = useSelector((state) => state.jobs.allProject);
    const [projectName, setProjectName] = React.useState("");
    const idProject = props.route.params.projectId;
    const [modalDeleteProjectVisible, setModalDeleteProjectVisible] = useState(false);
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0


    const [modalAddProjectMemberVisible, setModalAddProjectMemberVisible] = useState(false);
    const [modalEditProjectMemberVisible, setModalEditProjectMemberVisible] = useState(false);
    const [modalDeleteUserVisible, setModalDeleteUserVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [project, setProject] = useState({});
    const [task, setTask] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [userId, setUserId] = useState("");
    const [userChoosen, setUserChoosen] = useState("");

    React.useEffect(() => {



        const willFocusSubscription = props.navigation.addListener('focus', () => {
            handleReload();
        });

        return willFocusSubscription;
    }, []);

    // React.useEffect(() => {
    //     handleReload();
    // }, []);

    function handleReload() {

        allTaskByProject(projectId, user.idUser, user.token).then(data => {
            dispatch(jobsSlice.actions.setTask(data));
            setTask(data)
        })
            .catch(err => console.error(err))

        allUserProject(user.idUser, user.token).then(data => {
            dispatch(jobsSlice.actions.setProject(data));
        })
            .catch(err => console.error(err))

    }


    const renderInner = () => (
        <View style={styles.panel}>
            <KeyboardAvoidingView style={{ justifyContent: "center", alignItems: "center", paddingBottom: 10 }}>
                <TextInput style={FONTS.h2} placeholder="Name project..." />
            </KeyboardAvoidingView>

            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}
                onPress={() => {
                    setModalVisible(true);
                    bs.current.snapTo(1);
                }}>
                <Image source={icons.editName} style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Edit project's name</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]} onPress={() => props.navigation.navigate("CreateTask", { projectId: idProject })}>
                <Image source={icons.add} style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Create task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]} onPress={() => {
                bs.current.snapTo(1);
                setModalAddProjectMemberVisible(true);
            }}>
                <Image source={icons.adduser} style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Add project's member</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]}
                onPress={() => {
                    bs.current.snapTo(1);
                    handleLoadUser();
                    setModalEditProjectMemberVisible(true);
                }}
            >
                <Image source={icons.adduser} style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={styles.panelButtonTitle}>Edit project's member</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.panelButton, { backgroundColor: "lightsalmon" }]} onPress={() => {
                setModalDeleteProjectVisible(true);
                bs.current.snapTo(1);
            }} >
                <Image source={icons.deleteColor} style={{ width: 20, height: 20, marginRight: 10 }} />
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

    function handleEditProject(projectName) {
        var data = {

            IdUser: user.idUser,
            IdProject: projectId,
            ProjectName: projectName
        }
        var result = editProject(data, user.token);
        result.then(response => {

            setProjectName("");
            handleReload()
            Alert.alert("Edit success")
        })
            .catch(err => {
                console.log(err)
            })

    }

    function handleDeleteProject() {
        var data = {
            IdUser: user.idUser,
            IdSth: projectId
        }

        var result = deleteProject(data, user.token);
        result.then(response => {

            setProjectName("");
            handleReload()
            Alert.alert("delete success");

            props.navigation.goBack()


        })
            .catch(err => {
                console.log(err)
            })
    }

    const modalEditProjectName = () => {
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
                                            "Projet's name not null ");
                                    } else {

                                        handleEditProject(projectName);
                                        setModalVisible(!modalVisible)
                                        console.log('edit');
                                    }
                                }}
                            >

                                <Text style={styles.textStyle}>Edit project</Text>

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

    const modalDeleteProject = () => {
        return (
            <Modal
                style={styles.modalContent}
                animationType="slide"
                transparent={true}
                visible={modalDeleteProjectVisible}

                onRequestClose={() => {
                    setModalDeleteProjectVisible(!modalDeleteProjectVisible);
                }}
            >
                <View style={{ ...styles.centeredView, width: '100%' }}>
                    <View style={{ ...styles.modalView, width: '100%' }}>
                        <View>
                            <Text style={{ fontSize: 15 }}>Delete project will delete all tasks in project. Are you really want to delete project?</Text>
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
                                    handleDeleteProject();
                                    setModalDeleteProjectVisible(!modalDeleteProjectVisible)
                                }}
                            >

                                <Text style={styles.textStyle}>Delete</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, { backgroundColor: "black", marginHorizontal: 50, width: 120 }]}
                                onPress={() => setModalDeleteProjectVisible(!modalDeleteProjectVisible)}
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
            IdProject: projectId,
            IdUser: user.idUser
        }

        var result = addProjectMembers(data, user.token);
        result
            .then(response => {
                setUsers([]);
                setModalAddProjectMemberVisible(!modalAddProjectMemberVisible);
                Alert.alert(response.resultObject);
            })
            .catch(err => {
                Alert.alert("Thêm thất bại.");
            })
        setSearchText("");
    }

    function handleLoadUser() {
        getUserByProjectId(projectId, user.token).then(data => {
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
            console.log(matchUsers)
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
                visible={modalAddProjectMemberVisible}

                onRequestClose={() => {
                    setModalAddProjectMemberVisible(!modalAddProjectMemberVisible);
                }}
            >
                <View style={{ ...styles.centeredView, width: '100%' }}>
                    <View style={{ ...styles.modalView, width: '100%', height: (SIZES.height * 70 / 100) }}>
                        {renderSearch(handleSearchUser)}

                        <View style={{ flex: 1 }}>
                            <FlatList
                                vertical
                                data={users}
                                keyExtractor={(item, index) => index}
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
                                    setModalAddProjectMemberVisible(!modalAddProjectMemberVisible);
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
                visible={modalEditProjectMemberVisible}

                onRequestClose={() => {
                    setModalEditProjectMemberVisible(!modalEditProjectMemberVisible);
                }}
            >
                <View style={{ ...styles.centeredView, width: '100%' }}>
                    <View style={{ ...styles.modalView, width: '100%', height: (SIZES.height * 70 / 100) }}>
                        {renderSearch(handleLoadUser)}

                        <View style={{ width: '100%', flex: 1 }}>
                            <FlatList
                                vertical
                                data={users}
                                keyExtractor={(item, index) => index}
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
                                    setModalEditProjectMemberVisible(!modalEditProjectMemberVisible);
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
            IdUser: user.idUser,
            IdSth: userChoosen,
            IdProject: projectId
        }
        var result = removeProjectMembers(data, user.token);
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
        <View>
            {modalEditProjectName()}
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

                opacity: Animated.add(1, Animated.multiply(fall, 1.0)),
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
                            Project: {props.route.params.projectName}
                        </Text>
                        <Text>Creator: {props.route.params.userName} </Text>
                    </View>
                    {props.route.params.userId == user.idUser &&

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
                <FlatList
                    style={{ height: "100%" }}
                    vertical
                    data={task}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <HorizontalTaskCard
                                containerStyle={{
                                    justifyContent: "center",
                                    marginHorizontal: SIZES.padding,
                                    marginBottom:
                                        index == allTask.length - 1 ? 200 : SIZES.radius,
                                }}
                                item={item}
                                onPress={() => {

                                    props.navigation.navigate("TaskDetail", {
                                        item: [item]
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
    modalContent: {
        height: '100%'
    },
});

export default ProjectDetail;
