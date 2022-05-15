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
import { FONTS, COLORS, SIZES, icons, dummyData } from "../../constants";
import { HorizontalProjectCard, VerticalFoodCard } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import jobsSlice from "../../stores/Job/jobsSlice";
import { allUserProject, createProject } from "../../apis/ProjectApi";
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

const Project = ({ navigation }) => {
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = React.useState("My Own Project");
    const [projectName, setProjectName] = React.useState("");
    const [listProject, setListProject] = React.useState([]);

    const projects = useSelector((state) => state.jobs.allProject);
    const allTask = useSelector((state) => state.jobs.allTask);
    const myId = useSelector((state) => state.authentication.id);

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    React.useEffect(() => {
        setListProject(projects)
        handleChangeStatus(selectedStatus);

        const willFocusSubscription = navigation.addListener('focus', () => {
            handleReload();
        });

        return willFocusSubscription;
    }, []);

    function handleReload() {

        allTaskOfUser(myId).then(data => {

            dispatch(jobsSlice.actions.setTask(data));

        })
            .catch(err => console.error(err))


        allUserProject(myId).then(data => {
            dispatch(jobsSlice.actions.setProject(data));

        })
            .catch(err => console.error(err))
    }


    function handleChangeStatus(status) {
        //retrieve recommend list
        if (status === "My Own Project") {
            setListProject(projects);
        } else {
            let selectedProjectWithSTatus = allTask.filter(
                (a) => a.userCreateProject !== myId
            );
            let projects = [];
            selectedProjectWithSTatus.forEach((project) => {
                console.log(project.idGroup)
                let item = {
                    idGroup: project.idGroup,
                    idProject: project.idProject,
                    mailUserCreateGroup: project.mailUserCreateGroup,
                    mailUserCreateProject: project.mailUserCreateGroup,
                    nameGroup: project.nameGroup,
                    nameProject: project.nameProject,
                    nameUserCreateGroup: project.nameUserCreateGroup,
                    nameUserCreateProject: project.nameUserCreateProject,
                    phoneUserCreateGroup: project.phoneUserCreateGroup,
                    phoneUserCreateProject: project.phoneUserCreateProject,
                    projectCreateDate: project.projectCreateDate,
                    userCreateGroup: project.userCreateGroup,
                    userCreateProject: project.userCreateProject,
                };
                projects.push(item);
            });
            function getUniqueListBy(arr, key) {
                return [...new Map(arr.map(item => [item[key], item])).values()]
            }
            setListProject(getUniqueListBy(projects, "idProject"));
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
                        marginVertical: SIZES.base,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2,
                        width: "80%",
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
                        placeholder="Search project...."
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
                    <TouchableOpacity onPress={() => handleReload()}>
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

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* search */}
            {renderSearch()}

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
                        setSelectedStatus(dummyData.CATEGORY_DEFAULT_PROJECT[0].status);
                        handleChangeStatus(dummyData.CATEGORY_DEFAULT_PROJECT[0].status);
                    }}
                >
                    <Text
                        style={{
                            color:
                                selectedStatus === dummyData.CATEGORY_DEFAULT_PROJECT[0].status
                                    ? COLORS.primary
                                    : COLORS.black,
                            ...FONTS.h4,
                        }}
                    >
                        {dummyData.CATEGORY_DEFAULT_PROJECT[0].status}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        padding: 10,
                    }}
                    onPress={() => {
                        setSelectedStatus(dummyData.CATEGORY_DEFAULT_PROJECT[1].status);
                        handleChangeStatus(dummyData.CATEGORY_DEFAULT_PROJECT[1].status);
                    }}
                >
                    <Text
                        style={{
                            color:
                                selectedStatus === dummyData.CATEGORY_DEFAULT_PROJECT[1].status
                                    ? COLORS.primary
                                    : COLORS.black,
                            ...FONTS.h4,
                        }}
                    >
                        {dummyData.CATEGORY_DEFAULT_PROJECT[1].status}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* List*/}
            <FlatList
                style={{ flex: 1 }}
                vertical
                data={listProject}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                // ListHeaderComponent={
                //     <View style={{ flex: 1}}>
                //         {/*project types */}
                //         {renderMenuTypes()}
                //     </View>
                // }
                renderItem={({ item, index }) => {
                    return (
                        <HorizontalProjectCard
                            containerStyle={{
                                justifyContent: "center",
                                marginHorizontal: SIZES.padding,
                                marginBottom:
                                    index == listProject.length - 1 ? 200 : SIZES.radius,
                            }}
                            item={item}
                            onPress={() => {
                                console.log("NAVIGATE");
                                navigation.navigate("ProjectDetail", {
                                    projectId: item.idProject,
                                    projectName: item.nameProject,
                                    createName: item.nameUserCreateProject,
                                    userId: item.createUser,
                                });
                            }}
                        />
                    );
                }}
            />
        </View>
    );
};

export default Project;
