import { Text, View, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, COLORS, SIZES, icons, dummyData } from '../../constants';
import { HorizontalTaskCard, VerticalFoodCard } from '../../components';

import { useSelector, useDispatch } from "react-redux";
import jobsSlice from "../../stores/Job/jobsSlice";
import { allTaskOfUser } from "../../apis/TaskApi";
import { allUserGroup } from "../../apis/GroupApi";
import { allUserProject } from "../../apis/ProjectApi";

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

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = React.useState(1);
    const [listTask, setListTask] = React.useState([]);
    const [searchText, setSearchText] = React.useState("");

    const user = useSelector((state) => state.authentication.user);
    const allTaskRaw = useSelector((state) => state.jobs.allTask);
    var allTask = allTaskRaw;
    
    if(searchText!==null && searchText!==""){
        allTask = allTaskRaw.filter(x=>x.nameTask.toLowerCase().includes(searchText.toLowerCase()));
    }

    // console.log(allTask);
    
    React.useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', () => {
            handleReload();
        });

        return willFocusSubscription;
    }, [])

    function handleChangeStatus(statusId) {
        //retrieve recommend list
        let selectedTaskWithSTatus = allTask.filter(a => a.statusId == statusId)
        //set 
        setListTask(selectedTaskWithSTatus);
        // console.log(selectedTaskWithSTatus)
    }

    function handleReload(){
        allTaskOfUser(user.idUser, user.token).then(data => {
            dispatch(jobsSlice.actions.setTask(data));
        })
            .catch(err => console.error(err))

        allUserGroup(user.idUser, user.token).then(data => {
            dispatch(jobsSlice.actions.setGroup(data));
        })
            .catch(err => console.error(err))

        allUserProject(user.idUser, user.token).then(data => {
            dispatch(jobsSlice.actions.setProject(data));
        })
            .catch(err => console.error(err))

        
        setSelectedStatus(selectedStatus);
        handleChangeStatus(selectedStatus);
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

    function renderSearch1() {
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
                    placeholder="Search task...."
                    onChangeText={(value) => {
                        setSearchText(value);
                    }}
                    value={searchText}
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

    function renderMenuTypes() {
        return (
            <FlatList
                horizontal
                data={dummyData.CATEGORY_STATUS}
                keyExtractor={item1 => item1.id}
                showsHorizontalScrollIndicator={false}
                onScrollToIndexFailed={info => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        flatList.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 30,
                }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                marginLeft: SIZES.padding * 2,
                                marginRight: index == dummyData.CATEGORY_STATUS.length - 1 ? SIZES.padding : 0
                            }}
                            onPress={() => {
                                setSelectedStatus(item.id);
                                handleChangeStatus(item.id);
                            }}
                        >
                            <Text
                                style={{
                                    color: selectedStatus == item.id ? COLORS.primary : COLORS.black,
                                    ...FONTS.h4
                                }}
                            >
                                {item.status}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }


    return (
        <View
            style={{ flex: 1 }}
        >
            {/* search */}
            {renderSearch()}


            {/* List*/}
            <FlatList
                style={{ flex: 1 }}
                vertical
                data={listTask}
                keyExtractor={(item) => item.idTask}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={{ flex: 1 }}>
                        
                        {/* meny types */}
                        {renderMenuTypes()}
                    </View>
                }
                renderItem={({ item, index }) => {
                    return (
                        <HorizontalTaskCard
                            containerStyle={{
                                justifyContent: 'center',
                                marginHorizontal: SIZES.padding,
                                marginBottom: index == listTask.length - 1 ? 200 : SIZES.radius,

                            }}
                            imageStyle={{
                                borderRadius: SIZES.radius,
                                marginRight: 20,
                                height: 150,
                                width: 150
                            }}

                            item={item}
                            onPress={() => {
                                console.log("NAVIGATE")
                                console.log([item])
                                navigation.navigate("TaskDetail", {
                                    item: [item]

                                })
                            }}
                        />

                    )
                }}
            />
        </View>
    )
}

export default Home;