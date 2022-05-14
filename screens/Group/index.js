import {
    Text,
    View,
    TextInput,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";
import React from "react";
import { useState } from "react";
import { FONTS, COLORS, SIZES, icons, dummyData } from "../../constants";
import {
    HorizontalGroupCard,
} from "../../components";

import { useSelector, useDispatch } from "react-redux";
import jobsSlice from "../../stores/Job/jobsSlice";
import { allUserGroup, createGroup } from "../../apis/GroupApi";
import { allTaskOfUser } from "../../apis/TaskApi";


const Section = ({ title, onPress, children }) => {
    return (
        <View>
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
                    marginHorizontal: SIZES.padding,
                    marginTop: 30,
                    marginBottom: 30,
                }}
            >
                <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
                        Show all
                    </Text>
                </TouchableOpacity>
            </View>

            {/* content */}
            {children}
        </View>
    );
};

const Group = ({ navigation }) => {
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = React.useState("My Own Group");
    const [groupName, setGroupName] = React.useState("");
    const [listGroup, setListGroup] = React.useState([]);

    const groups = useSelector((state) => state.jobs.allGroup);
    const allTask = useSelector((state) => state.jobs.allTask);
    const myId = useSelector((state) => state.authentication.id);

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    React.useEffect(() => {
        setListGroup(groups)
        handleChangeStatus(selectedStatus);
    }, []);

    function handleReload(){
        allTaskOfUser(myId).then(data => {
            dispatch(jobsSlice.actions.setTask(data));
        })
            .catch(err => console.error(err))

        allUserGroup(myId).then(data => {
            dispatch(jobsSlice.actions.setGroup(data));
        })
            .catch(err => console.error(err))
    }

    function handleCreateGroup(groupName){
        
        var data = {
            NameGroup:groupName,
            IdUser:myId
        }
        var result = createGroup(data);
        result.then(data=>{
            handleReload()
        })
        .catch(err=>{
            Alert("Tạo nhóm thất bại, thử lại sau");
        })
        
    }

    function handleChangeStatus(status) {
        //retrieve recommend list
        if (status === "My Own Group") {
            setListGroup(groups);

        } else {
            let selectedGroupWithSTatus = allTask.filter(
                (a) => a.userCreateGroup !== myId
            );
            let Groups = [];
            selectedGroupWithSTatus.forEach((Group) => {
                let item = {
                    idGroup: Group.idGroup,
                    idProject: Group.idProject,
                    mailUserCreateGroup: Group.mailUserCreateGroup,
                    mailUserCreateProject: Group.mailUserCreateGroup,
                    nameGroup: Group.nameGroup,
                    nameProject: Group.nameProject,
                    nameUserCreateGroup: Group.nameUserCreateGroup,
                    nameUserCreateProject: Group.nameUserCreateProject,
                    phoneUserCreateGroup: Group.phoneUserCreateGroup,
                    phoneUserCreateProject: Group.phoneUserCreateProject,
                    projectCreateDate: Group.projectCreateDate,
                    userCreateGroup: Group.userCreateGroup,
                    userCreateProject: Group.userCreateProject,
                };
                Groups.push(item);
            });
            function getUniqueListBy(arr, key) {
                return [...new Map(arr.map(item => [item[key], item])).values()]
            }
            setListGroup(getUniqueListBy(Groups, "idGroup"));
        }
    }

    function renderSearch() {
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
                    {/* Icon */}
                    <Image
                        source={icons.search}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.black,
                        }}
                    />

                    {/* Text input */}
                    <TextInput
                        style={{
                            flex: 1,
                            marginLeft: SIZES.radius,
                            ...FONTS.body3,
                        }}
                        placeholder="Search group...."
                    />

                    {/* Filter Button */}
                    <TouchableOpacity>
                        <Image
                            source={icons.filter}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                            }}
                        />
                    </TouchableOpacity>
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
                    <TouchableOpacity onPress={() =>handleReload()}>
                        <Image
                            source={icons.reload}
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

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View
            style={{
                flex: 1,
            }}
        >
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
                            marginTop:20
                        }}>
                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, { marginRight: 50, marginLeft:30, width:120 }]}
                                onPress={() => {
                                    var NameGroup = groupName.trim();
                                    if(NameGroup==="" || !NameGroup){
                                        Alert.alert(
                                            "Thông báo",
                                            "Không để trống tên nhóm");
                                    }else{
                                        handleCreateGroup(groupName);
                                        setModalVisible(!modalVisible);
                                    }
                                    
                                }}
                            >
                                <Text style={styles.textStyle}>Create group</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose, { backgroundColor: "black", marginHorizontal: 50, width:120 }]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
            {/* search */}
            {renderSearch()}

            {/* <View>
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                    <View>
                        <Text style={FONTS.h4}>
                            CREATE YOUR GROUP
                        </Text>
                    </View>

                </TouchableOpacity>
            </View> */}

            <View style={{
                marginLeft: 20
            }}>
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
            <View
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    borderBottomLeftRadius: SIZES.radius,
                    borderBottomRightRadius: SIZES.radius,
                    paddingBottom: 5,
                    overflow: "hidden",
                }}
            >
                <TouchableOpacity
                    style={{
                        padding: 10,
                    }}
                    onPress={() => {
                        setSelectedStatus(dummyData.CATEGORY_DEFAULT_GROUP[0].status);
                        handleChangeStatus(dummyData.CATEGORY_DEFAULT_GROUP[0].status);
                    }}
                >
                    <Text
                        style={{
                            color:
                                selectedStatus === dummyData.CATEGORY_DEFAULT_GROUP[0].status
                                    ? COLORS.primary
                                    : COLORS.black,
                            ...FONTS.h4,
                        }}
                    >
                        {dummyData.CATEGORY_DEFAULT_GROUP[0].status}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        padding: 10,
                    }}
                    onPress={() => {
                        setSelectedStatus(dummyData.CATEGORY_DEFAULT_GROUP[1].status);
                        handleChangeStatus(dummyData.CATEGORY_DEFAULT_GROUP[1].status);
                    }}
                >
                    <Text
                        style={{
                            color:
                                selectedStatus === dummyData.CATEGORY_DEFAULT_GROUP[1].status
                                    ? COLORS.primary
                                    : COLORS.black,
                            ...FONTS.h4,
                        }}
                    >
                        {dummyData.CATEGORY_DEFAULT_GROUP[1].status}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* List*/}
            <FlatList
                style={{ flex: 1 }}
                data={listGroup}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                // ListHeaderComponent={
                //     <View style={{ flex: 1}}>
                //         {/*Group types */}
                //         {renderMenuTypes()}
                //     </View>
                // }
                renderItem={({ item, index }) => {
                    return (
                        <HorizontalGroupCard
                            containerStyle={{
                                justifyContent: "center",
                                marginHorizontal: SIZES.padding,
                                marginBottom: index === listGroup.length - 1 ? 200 : SIZES.radius,
                            }}
                            item={item}
                            onPress={() => {
                                navigation.navigate("GroupDetail", { groupId: item.idGroup });
                            }}
                        />
                    );
                }}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    button: {
        fontSize: 15,
        backgroundColor: "linen",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        height: 40,

        margin: 10,
        marginRight: "20%",
        marginLeft: "20%",

        shadowColor: "navy",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: '100%'
    },
    modalView: {
        borderWidth: 1,
        borderColor: '#ccc',
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
    buttonModal: {
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
    modalContent: {
        width: '100%',
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
});


export default Group;
