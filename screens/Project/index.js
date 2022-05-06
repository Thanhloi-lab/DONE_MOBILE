import { Text, View, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, COLORS, SIZES, icons, dummyData } from '../../constants';
import { HorizontalProjectCard, VerticalFoodCard } from '../../components';

const Section = ({ title, onPress, children }) => {
    return (
        <View>
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    marginTop: 30,
                    marginBottom: 30
                }}
            >
                <Text style={{ flex: 1, ...FONTS.h3 }}>
                    {title}
                </Text>
                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
                        Show all
                    </Text>
                </TouchableOpacity>
            </View>

            {/* content */}
            {children}
        </View>
    )
}

const Project = ({ navigation }) => {
    const [selectedStatus, setSelectedStatus] = React.useState(1);

    const [listProject, setListProject] = React.useState([]);

    React.useEffect(() => {
        handleChangeStatus(selectedStatus);
    }, [])

    function handleChangeStatus(status) {
        //retrieve recommend list
        if (status === "My Own Project") {
            let selectedProjectWithSTatus = dummyData.allTask.filter(a => a.userCreateProject === dummyData.myProfile.id)
            let projects = [];
            selectedProjectWithSTatus.forEach(project =>{
                let item ={
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
                }
                projects.push(item);
            })
            setListProject(projects);
        }
        else {
            let selectedProjectWithSTatus = dummyData.allTask.filter(a => a.userCreateProject !== dummyData.myProfile.id)
            let projects = [];
            selectedProjectWithSTatus.forEach(project =>{
                let item ={
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
                }
                projects.push(item);
            })
            setListProject(projects);
        }
    }

    function renderSearch() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 40,
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                {/* Icon */}
                <Image
                    source={icons.search}
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.black
                    }}
                />

                {/* Text input */}
                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        ...FONTS.body3
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
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* search */}
            {renderSearch()}

            <View style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderBottomLeftRadius: SIZES.radius,
                borderBottomRightRadius: SIZES.radius,
                paddingBottom:5,
                overflow: 'hidden',
            }}>
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
                            color: selectedStatus === dummyData.CATEGORY_DEFAULT_PROJECT[0].status ? COLORS.primary : COLORS.black,
                            ...FONTS.h4
                        }}
                    >
                        {dummyData.CATEGORY_DEFAULT_PROJECT[0].status}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        padding: 10
                    }}
                    onPress={() => {
                        setSelectedStatus(dummyData.CATEGORY_DEFAULT_PROJECT[1].status);
                        handleChangeStatus(dummyData.CATEGORY_DEFAULT_PROJECT[1].status);
                    }}
                >
                    <Text
                        style={{
                            color: selectedStatus === dummyData.CATEGORY_DEFAULT_PROJECT[1].status ? COLORS.primary : COLORS.black,
                            ...FONTS.h4
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
                keyExtractor={(item) => item.idTask}
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
                                height: 150,
                                justifyContent: 'center',
                                marginHorizontal: SIZES.padding,
                                marginBottom: index == listProject.length - 1 ? 200 : SIZES.radius,

                            }}

                            item={item}
                            onPress={() => {
                                console.log("NAVIGATE")
                                navigation.navigate("Detail")
                            }}
                        />

                    )
                }}
            />
        </View>
    )
}

export default Project;