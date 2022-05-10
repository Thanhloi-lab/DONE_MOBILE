import React, { useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Animated,
    Platform
} from 'react-native';
import { VictoryPie } from 'victory-native';

import { Svg } from 'react-native-svg';

import { COLORS, FONTS, SIZES, icons, images } from '../../constants';

const Statistics = () => {

    // dummy data
    const confirmStatus = "C"
    const pendingStatus = "P"

    let categoriesData = [
        {
            id: 1,
            name: "Uncompleted",
            icon: icons.unCompleted,
            color: COLORS.COMPLETED1,
            expenses: [
                {
                    id: 1,
                    title: "Project Tuition Fee",
                    group: "Group abc",
                    user: "someone",
                    total: 2,
                    status: pendingStatus
                },
                {
                    id: 2,
                    title: "Project Arduino",
                    group: "Group Hardward",
                    user: "ByProgrammers' tuition center",
                    total: 4,
                    status: pendingStatus
                },
                {
                    id: 3,
                    title: "Project Javascript Books",
                    group: "Group Javascript books",
                    user: "ByProgrammers' Book Store",
                    total: 3,
                    status: confirmStatus
                },
                {
                    id: 4,
                    title: "Project PHP Books",
                    group: "Group PHP books",
                    user: "ByProgrammers' Book Store",
                    total: 1,
                    status: confirmStatus
                }
            ],
        },
        {
            id: 2,
            name: "Completed",
            icon: icons.completed,
            color: 'orange',
            expenses: [
                {
                    id: 5,
                    title: "Project Vitamins",
                    group: "Group Vitamin",
                    user: "ByProgrammers' Pharmacy",
                    total: 7,
                    status: pendingStatus,
                },

                {
                    id: 6,
                    title: "Project Protein powder",
                    group: "Group Protein",
                    user: "ByProgrammers' Pharmacy",
                    total: 16,
                    status: confirmStatus,
                },

            ],
        },
        {
            id: 3,
            name: "Bug",
            icon: icons.bug,
            color: COLORS.primary,
            expenses: [
                {
                    id: 7,
                    title: "Project Toys",
                    group: "Group toys",
                    user: "ByProgrammers' Toy Store",
                    total: 8,
                    status: confirmStatus,
                },
                {
                    id: 8,
                    title: "Project Baby Car Seat",
                    group: "Group Baby Car Seat",
                    user: "ByProgrammers' Baby Care Store",
                    total: 7,
                    status: pendingStatus,
                },
                {
                    id: 9,
                    title: "Project Pampers",
                    group: "Group Pampers",
                    user: "ByProgrammers' Supermarket",
                    total: 2,
                    status: pendingStatus,
                },
                {
                    id: 10,
                    title: "Project T-Shirt",
                    group: "Group T-Shirt",
                    user: "ByProgrammers' Fashion Store",
                    total: 3,
                    status: pendingStatus,
                },
            ],
        },
        {
            id: 4,
            name: "Expired",
            icon: icons.expired,
            color: 'blue',
            expenses: [
                {
                    id: 11,
                    title: "Project Skin Care product",
                    group: "Group skin care",
                    user: "ByProgrammers' Pharmacy",
                    total: 9,
                    status: pendingStatus,
                },
                {
                    id: 12,
                    title: "Project Lotion",
                    group: "Group Lotion",
                    user: "ByProgrammers' Pharmacy",
                    total: 9,
                    status: confirmStatus,
                },
                {
                    id: 13,
                    title: "Project Face Mask",
                    group: "Group Face Mask",
                    user: "ByProgrammers' Pharmacy",
                    total: 7,
                    status: pendingStatus,
                },
                {
                    id: 14,
                    title: "Project Sunscreen cream",
                    group: "Group Sunscreen cream",
                    user: "ByProgrammers' Pharmacy",
                    total: 5,
                    status: pendingStatus,
                },
            ],
        },
    ]

    const categoryListHeightAnimationValue = useRef(new Animated.Value(115)).current;

    const [categories, setCategories] = React.useState(categoriesData)
    const [viewMode, setViewMode] = React.useState("chart")
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [showMoreToggle, setShowMoreToggle] = React.useState(false)


    function renderCategoryHeaderSection() {
        return (
            <View style={{ flexDirection: 'row', padding: SIZES.padding, justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Title */}
                <View>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.green,
                            height: 50,
                            width: 110,
                            borderRadius: 25,
                            borderWidth: 3,
                            borderColor: COLORS.secondary
                        }}
                        onPress={() => setViewMode("chart")}
                    >
                        <Text style={{ color: "white", ...FONTS.h4 }}>
                            PRINT FILE
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Button */}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: viewMode == "chart" ? COLORS.secondary : COLORS.white,
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            borderWidth: 2,
                            borderColor: "black"
                        }}
                        onPress={() => setViewMode("chart")}
                    >
                        <Image
                            source={icons.chart}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: viewMode == "chart" ? COLORS.white : COLORS.black,
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: viewMode == "list" ? COLORS.secondary : COLORS.white,
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            marginLeft: SIZES.base,
                            borderWidth: 2,
                            borderColor: "black"
                        }}
                        onPress={() => setViewMode("list")}
                    >
                        <Image
                            source={icons.menu}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: viewMode == "list" ? COLORS.white : COLORS.black,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderCategoryList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    margin: 5,
                    paddingVertical: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    borderRadius: 5,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
                }}
            >
                <Image
                    source={item.icon}
                    style={{
                        width: 20,
                        height: 20,
                    }}
                />
                <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}>{item.name}</Text>
            </TouchableOpacity>
        )

        return (
            <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
                <Animated.View style={{ height: categoryListHeightAnimationValue }}>
                    <FlatList
                        data={categories}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        numColumns={2}
                    />
                </Animated.View>

            </View>
        )
    }

    function renderIncomingExpensesTitle() {
        return (
            <View style={{ height: 80, backgroundColor: COLORS.lightGray2, padding: SIZES.padding }}>
                {/* Title */}
                <Text style={{ ...FONTS.h3, color: COLORS.primary }}>DETAILS</Text>
                <Text style={{ ...FONTS.body4, color: COLORS.darkgray }}>12 Total</Text>
            </View>
        )
    }

    function renderIncomingExpenses() {
        let allExpenses = selectedCategory ? selectedCategory.expenses : []
        let incomingExpenses = allExpenses.filter(a => a.status == "P")

        const renderItem = ({ item, index }) => (
            <View style={{
                width: 300,
                marginRight: SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : 0,
                marginVertical: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...styles.shadow
            }}>
                {/* Title */}
                <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center' }}>
                    <View
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: COLORS.lightGray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: SIZES.base
                        }}
                    >
                        <Image
                            source={selectedCategory.icon}
                            style={{
                                width: 30,
                                height: 30,

                            }}
                        />
                    </View>

                    <Text style={{ ...FONTS.h3, color: selectedCategory.color, }}>{selectedCategory.name}</Text>
                </View>

                {/* Expense group */}
                <View style={{ paddingHorizontal: SIZES.padding }}>
                    {/* Title and group */}
                    <Text style={{ ...FONTS.h2, }}>{item.title}</Text>
                    <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.black }}>
                        {item.group}
                    </Text>

                    {/* user */}
                    <Text style={{ marginTop: SIZES.padding, ...FONTS.h4, }}>User</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={icons.pin}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.black,
                                marginRight: 5
                            }}
                        />
                        <Text style={{ marginBottom: SIZES.base, color: COLORS.black, ...FONTS.body4 }}>{item.user}</Text>
                    </View>
                </View>

                {/* Price */}
                <View
                    style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomStartRadius: SIZES.radius,
                        borderBottomEndRadius: SIZES.radius,
                        backgroundColor: selectedCategory.color,
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>SPEND {item.total} DAYS</Text>
                </View>
            </View>
        )

        return (
            <View>
                {renderIncomingExpensesTitle()}

                {
                    incomingExpenses.length > 0 &&
                    <FlatList
                        data={incomingExpenses}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                }

                {
                    incomingExpenses.length == 0 &&
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
                        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>No Record</Text>
                    </View>
                }

            </View>

        )
    }

    function processCategoryDataToDisplay() {
        // Filter expenses with "Confirmed" status
        let chartData = categories.map((item) => {
            let confirmExpenses = item.expenses.filter(a => a.status == "C")
            var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0)

            return {
                name: item.name,
                y: total,
                expenseCount: confirmExpenses.length,
                color: item.color,
                id: item.id
            }
        })

        // filter out categories with no data/expenses
        let filterChartData = chartData.filter(a => a.y > 0)

        // Calculate the total expenses
        let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

        // Calculate percentage and repopulate chart data
        let finalChartData = filterChartData.map((item) => {
            let percentage = (item.y / totalExpense * 100).toFixed(0)
            return {
                label: `${percentage}%`,
                y: Number(item.y),
                expenseCount: item.expenseCount,
                color: item.color,
                name: item.name,
                id: item.id
            }
        })

        return finalChartData
    }

    function setSelectCategoryByName(name) {
        let category = categories.filter(a => a.name == name)
        setSelectedCategory(category[0])
    }

    function renderChart() {

        let chartData = processCategoryDataToDisplay()
        let colorScales = chartData.map((item) => item.color)
        let totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0)

        console.log("Check Chart")

        if (Platform.OS == 'ios') {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <VictoryPie

                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                        style={{
                            labels: { fill: "white", ...FONTS.body3 },
                            parent: {
                                ...styles.shadow
                            },
                        }}
                        width={SIZES.width * 0.8}
                        height={SIZES.width * 0.8}
                        colorScale={colorScales}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let categoryName = chartData[props.index].name
                                            setSelectCategoryByName(categoryName)
                                        }
                                    }]
                                }
                            }
                        }]}

                    />

                    <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
                        <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount - 1}</Text>
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Status</Text>
                    </View>
                </View>

            )
        }
        else {
            // Android workaround by wrapping VictoryPie with SVG
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Svg width={SIZES.width} height={SIZES.width} style={{ width: "100%", height: "auto" }}>

                        <VictoryPie
                            standalone={false} // Android workaround
                            data={chartData}
                            labels={(datum) => `${datum.y}`}
                            radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                            innerRadius={70}
                            labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                            style={{
                                labels: { fill: "white", ...FONTS.body3 },
                                parent: {
                                    ...styles.shadow
                                },
                            }}
                            width={SIZES.width}
                            height={SIZES.width}
                            colorScale={colorScales}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onPress: () => {
                                        return [{
                                            target: "labels",
                                            mutation: (props) => {
                                                let categoryName = chartData[props.index].name
                                                setSelectCategoryByName(categoryName)
                                            }
                                        }]
                                    }
                                }
                            }]}

                        />
                    </Svg>
                    <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
                        <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount - 1}</Text>
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Status</Text>
                    </View>
                </View>
            )
        }

    }

    function renderExpenseSummary() {
        let data = processCategoryDataToDisplay()

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    margin: 5,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? item.color : COLORS.white
                }}
                onPress={() => {
                    let categoryName = item.name
                    setSelectCategoryByName(categoryName)
                }}
            >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : item.color,
                            borderRadius: 5
                        }}
                    />

                    <Text style={{ marginLeft: SIZES.base, color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.name}</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.y} DAYS - {item.label}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <View style={{ padding: SIZES.padding, marginBottom: 200 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                />
            </View>

        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
            {/* Nav bar section */}
            {/* {renderNavBar()} */}

            {/* Header section */}
            {/* {renderHeader()} */}

            {/* Category Header Section */}
            {renderCategoryHeaderSection()}

            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {
                    viewMode == "list" &&
                    <View>
                        {renderCategoryList()}
                        {renderIncomingExpenses()}
                    </View>
                }
                {
                    viewMode == "chart" &&
                    <View>
                        {renderChart()}
                        {renderExpenseSummary()}
                    </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    button: {
        fontSize: 15,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        height: 60,
        marginTop: 20,
        shadowColor: "navy",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
})

export default Statistics;