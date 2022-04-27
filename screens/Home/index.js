import { Text, View, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, COLORS, SIZES, icons, dummyData } from '../../constants';
import { HorizontalTaskCard, VerticalFoodCard } from '../../components';

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

const Home = ({navigation}) => {
    const [selectedStatus, setSelectedStatus] = React.useState(1);

    const [listTask, setListTask] = React.useState([]);

    React.useEffect(() => {
        handleChangeStatus(selectedStatus);
    }, [])

    function handleChangeStatus(statusId) {
        //retrieve recommend list
        let selectedTaskWithSTatus= dummyData.allTask.filter(a => a.statusId == statusId)
        //set 
        setListTask(selectedTaskWithSTatus);
        // console.log(selectedTaskWithSTatus)
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
                    placeholder="Search task...."
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
            style={{ flex: 1}}
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
                                height: 150,
                                justifyContent:'center',
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
                                navigation.navigate("Detail")
                            }}
                        />
                        
                    )
                }}
            />
        </View>
    )
}

export default Home;