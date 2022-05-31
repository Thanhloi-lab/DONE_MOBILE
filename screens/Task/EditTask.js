import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TextInput,
    Image,
    TouchableOpacity,
    Keyboard,
    ImageBackground,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
} from "react-native";


import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';

import React from "react";
import { COLORS, FONTS, SIZES, icons, dummyData } from '../../constants'


import { useState, useEffect, useLayoutEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { validate } from "../../util/validation";
import jobsSlice from "../../stores/Job/jobsSlice";

import { useDispatch, useSelector } from "react-redux";
import { allTaskOfUser, createTask, editTask, updateStatus } from "../../apis/TaskApi";



const EditTask = (props) => {

    const projectId = props.route.params.projectId;
    const taskId = props.route.params.taskId;
    const userId = props.route.params.userId;
    const taskName = props.route.params.taskName;
    const taskDeadline = props.route.params.taskDeadline;
    let fields = taskDeadline.split('/')
    var month = fields[0]
    var day = fields[1]
    var field = fields[2].split(' ')
    var year = field[0]
    var time = field[1]
    const dateTineTask = year + '-' + month + '-' + day + 'T' + time + 'Z';


    const taskContent = props.route.params.taskContent;
    const taskStatus = props.route.params.taskStatus;
    const [status, setStatus] = useState(taskStatus)
    const [name, setName] = useState(taskName)
    const [nameError, setNameError] = useState(false);
    const [deadline, setDeadline] = useState(dateTineTask);
    const [deadlineError, setDeadlineError] = useState(false);
    const [content, setContent] = useState(taskContent);
    const [contentError, setContentError] = useState(false);
    const [complete, setComplete] = useState(false);
    const [error, setError] = useState("");
    const [show, setShow] = useState("");
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow("")
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let month = tempDate.getMonth() + 1;
        if (month < 10) { month = '0' + month }
        let fDate = tempDate.getFullYear() + '-' + month + '-' + tempDate.getDate();
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        setDeadline(fDate + 'T' + fTime + 'Z')
    }


    useLayoutEffect(() => {
        nameError || contentError ? setError(true) : setError(false)
    }, [nameError, contentError])


    function handleReload() {
        allTaskOfUser(user.idUser, user.token).then(data => {
            dispatch(jobsSlice.actions.setTask(data));
        })
            .catch(err => console.error(err))

    }

    const user = useSelector((state) => state.authentication.user);


    function handleEditTask(taskName, deadtime, info) {
        var data = {
            IdTask: taskId,
            IdUser: user.idUser,
            TaskName: taskName,
            Deadline: deadtime,
            Content: info
        }
        var result = editTask(data, user.token);
        result.then(response => {

            Alert.alert("Edit success")
            handleReload()
            props.navigation.goBack()
        })
            .catch(err => {
                Alert.alert("You are not permitted to edit this")
                console.log(err.message())
            })

    }

    function handleUpdateStatus(statusId) {
        var data = {
            IdTask: taskId,
            IdStatus: statusId,
        }
        var result = updateStatus(data, user.token);
        result.then(response => {
            handleReload()
        })
            .catch(err => {
                console.log(err.message())
            })

    }


    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary2]}
            style={styles.gradientContainer}
        >


            <View style={{ width: '100%', height: '100%' }}>
                <View style={{
                    height: 50,
                    paddingHorizontal: SIZES.radius * 1.5,
                    marginTop: 40,
                    alignItems: "center",
                    flexDirection: "row"
                }}>
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress={() => props.navigation.goBack()}
                    >
                        <Image
                            source={icons.back}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: 'white',
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        alignItems: "center",
                        width: "80%"
                    }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Edit Task</Text>
                    </View>

                </View>

                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setShow(false); }} >
                    <KeyboardAvoidingView behavior="padding" style={styles.container}>

                        <View >
                            <View >
                                <View style={[styles.inputContainer, show === 1 && { borderWidth: 1, borderColor: "lightgreen" }]}>
                                    <View style={styles.icon}>
                                        <Image source={icons.taskname}
                                            style={{
                                                width: 25,
                                                height: 25,

                                            }}
                                        />
                                        {show === 1 && (<View style={[styles.icon, { justifyContent: "flex-end", marginLeft: "10%" }]}>
                                            <TouchableOpacity onPress={() => {
                                                setName(""); setNameError(!validate("", "name"));
                                                setShow("");
                                            }}>
                                                <Image source={icons.close1} style={{
                                                    width: 20,
                                                    height: 20,

                                                }}
                                                />
                                            </TouchableOpacity></View>)
                                        }
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={name}
                                        onChangeText={(value) => {
                                            setNameError(!validate(value, "name"));
                                            setName(value);
                                            value !== '' ? setShow(1) : setShow('');

                                        }}
                                        onPressIn={() => { if (name !== '') setShow(1); }}
                                        placeholder="Task Name"

                                    />
                                </View>
                                {nameError && (
                                    <View style={styles.errorContainer}>
                                        <Text style={styles.errorText}>
                                            Valid name is required: not null
                                        </Text>
                                    </View>
                                )}




                                <View style={[styles.inputContainer, { height: 80, flexDirection: "column" }]}>
                                    <View style={styles.icon}>
                                        <Image source={icons.deadline}
                                            style={{
                                                width: 25,
                                                height: 25,

                                            }}
                                        />

                                    </View>
                                    <View style={{ flexDirection: "row" }}>

                                        <Text

                                            style={{ justifyContent: "center", alignItems: "center" }}
                                        >
                                            {deadline ? deadline : "DEADLINE"}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "flex-start", alignItems: "flex-start" }}>
                                        <TouchableOpacity style={[styles.buttonInside, { marginRight: 10 }]} onPress={() => { setShow(3) }}>
                                            <Text>choose date</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={[styles.buttonInside, { marginLeft: 10 }]} onPress={() => { setShow(2) }}>
                                            <Text>choose time</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                {
                                    show === 3 && (<DateTimePicker
                                        value={date}
                                        mode={'date'}
                                        display='default'
                                        onChange={onChange}
                                    />)
                                }
                                {
                                    show === 2 && (<DateTimePicker
                                        value={date}
                                        mode={'time'}
                                        display='default'
                                        is24Hour={true}
                                        onChange={onChange}

                                    />)
                                }
                                {deadlineError && (
                                    <View style={styles.errorContainer}>
                                        <Text style={styles.errorText}>
                                            Valid deadline is required: not null
                                        </Text>
                                    </View>
                                )}


                                <View style={[styles.inputContainer, { height: 120 }, show === 4 && { borderWidth: 1, borderColor: "lightgreen" }]}>
                                    <View style={styles.icon}>
                                        <Image source={icons.content}
                                            style={{
                                                width: 25,
                                                height: 25,
                                            }}
                                        />
                                        {show === 4 && (<View style={[styles.icon, { justifyContent: "flex-end", marginLeft: "10%" }]}>
                                            <TouchableOpacity onPress={() => {
                                                setContent(''); setContentError(!validate("", "content"));
                                                setShow('');
                                            }}>
                                                <Image source={icons.close1} style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginLeft: 320
                                                }}
                                                />
                                            </TouchableOpacity></View>)
                                        }
                                    </View>
                                    <TextInput
                                        style={[styles.input]}
                                        value={content}
                                        multiline={true}
                                        onChangeText={(value) => {
                                            setContentError(!validate(value, "content"));
                                            setContent(value);
                                            value !== '' ? setShow(4) : setShow('');

                                        }}
                                        onPressIn={() => { if (content !== '') setShow(4); }}

                                        placeholder="Write your content"
                                    />
                                </View>
                                {contentError && (
                                    <View style={styles.errorContainer}>
                                        <Text style={styles.errorText}>
                                            Valid content is required: not null
                                        </Text>
                                    </View>
                                )}

                                <View style={styles.inputContainer}>
                                    <View style={styles.icon}>
                                        <Image source={icons.status1}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: "red"
                                            }}
                                        />
                                    </View>
                                    <Picker

                                        selectedValue={status}
                                        style={styles.input}
                                        onValueChange={(itemValue) => { setStatus(itemValue), console.log(status) }}
                                    >
                                        <Picker.Item label="default" value="0" />
                                        <Picker.Item label="Uncompleted" value="1" />
                                        <Picker.Item label="Completed" value="2" />
                                        <Picker.Item label="Bug" value="3" />
                                        <Picker.Item label="Expired" value="4" />
                                    </Picker>
                                </View>




                                <TouchableOpacity style={styles.button} onPress={() => {
                                    var Name = name;
                                    var Content = content;

                                    if (deadline === undefined || deadline === null || !deadline || deadline === 'DEADLINE') {
                                        setDeadlineError(!validate(deadline, "deadline"))
                                    }

                                    else if (Name === "" || !Name || Name === null || Content === "" || !Content || Content === null) {
                                        Alert.alert(
                                            "Alert",
                                            "Projet's field not null ");
                                    } else {

                                        handleEditTask(name, deadline, content)
                                        if (status !== 0) {
                                            handleUpdateStatus(status)
                                        }
                                    }

                                }}>
                                    <Text style={{ color: "white", fontSize: 15 }}>CONFIRMED</Text>
                                </TouchableOpacity>




                            </View>
                        </View>


                    </KeyboardAvoidingView>

                </TouchableWithoutFeedback>
            </View>

        </LinearGradient>


    )
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        // justifyContent: "flex-end",
        // alignItems: "center",
        paddingTop: 0,
        height: '100%',

    },
    container: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        paddingTop: 20,
        borderRadius: SIZES.radius * 2,

    },
    infoContainer: {
        backgroundColor: "ghostwhite",

        padding: 5,
        paddingBottom: 70,
        marginTop: 10,

    },
    input: {
        height: '100%',
        width: '90%',
    },
    inputContainer: {
        height: 50,
        fontSize: 15,
        paddingLeft: 68,
        paddingRight: 50,
        borderRadius: 25,
        color: "#ccc",
        backgroundColor: "#f7f7f7",
        marginBottom: 10,
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    icon: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        left: 35,
        flex: 1,
        flexDirection: "row",
        paddingTop: 15

    },
    errorContainer: {
        paddingVertical: 4,
        paddingLeft: 20,
        marginBottom: 10,
    },
    errorText: {
        color: "#c80000",
    },
    button: {
        fontSize: 15,
        backgroundColor: "#57b846",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        height: 50,
        marginTop: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginRight: 30,
        marginLeft: 30
    },
    buttonInside: {
        fontSize: 15,
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        height: 35,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
});

export default EditTask
