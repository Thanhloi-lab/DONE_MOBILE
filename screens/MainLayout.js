import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import Animated, {
    Extrapolate,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import tabsSlice from "../stores/tab/tabsSlice";
import { LinearGradient } from "expo-linear-gradient";
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    dummyData,
    constants,
} from "../constants";
import { useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";
import {
    Group,
    Project,
    Home,
    Statistics,
    Notification,
} from "../screens/index.js";
import { Header } from "../components";

const TabButton = ({
    label,
    icon,
    isFocused,
    onPress,
    outerContainerStyle,
    innerContainerStyle,
}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View
                style={[
                    {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    outerContainerStyle,
                ]}
            >
                <Animated.View
                    style={[
                        {
                            flexDirection: "row",
                            height: 50,
                            width: "80%",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 25,
                        },
                        innerContainerStyle,
                    ]}
                >
                    <Image
                        source={icon}
                        style={{
                            margin: 0,
                            padding: 0,
                            width: 20,
                            height: 20,
                            tintColor: isFocused ? COLORS.white : COLORS.gray,
                        }}
                    />
                    {isFocused && (
                        <Text
                            numberOfLines={1}
                            style={{
                                paddingTop: 2,
                                marginLeft: SIZES.base,
                                color: COLORS.white,
                                ...FONTS.h4,
                            }}
                        >
                            {label}
                        </Text>
                    )}
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const MainLayout = ({ navigation, mainNavigation }) => {
    const dispatch = useDispatch();
    const selectedTab = useSelector((state) => state.tabs.selectedTab);

    const isDrawerOpen = useDrawerStatus();
    const flatListRef = React.useRef();

    //Reanimated share value
    const homeTabFlex = useSharedValue(1);
    const homeTabColor = useSharedValue(COLORS.white);

    const groupTabFlex = useSharedValue(1);
    const groupTabColor = useSharedValue(COLORS.white);

    const managementTabFlex = useSharedValue(1);
    const managementTabColor = useSharedValue(COLORS.white);

    const statisticsTabFlex = useSharedValue(1);
    const statisticsTabColor = useSharedValue(COLORS.white);

    const notificationTabFlex = useSharedValue(1);
    const notificationTabColor = useSharedValue(COLORS.white);

    const scaleLayout = useSharedValue(1);
    const borderRadiusLayout = useSharedValue(0);

    const scaleLayoutStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleLayout.value }],
        };
    });

    const borderRadiusLayoutStyle = useAnimatedStyle(() => {
        return {
            borderRadius: borderRadiusLayout.value,
        };
    });

    const homeFlexStyle = useAnimatedStyle(() => {
        return {
            flex: homeTabFlex.value,
        };
    });

    const homeColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: homeTabColor.value,
        };
    });

    const groupFlexStyle = useAnimatedStyle(() => {
        return {
            flex: groupTabFlex.value,
        };
    });

    const groupColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: groupTabColor.value,
        };
    });

    const managementFlexStyle = useAnimatedStyle(() => {
        return {
            flex: managementTabFlex.value,
        };
    });

    const managementColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: managementTabColor.value,
        };
    });

    const statisticsFlexStyle = useAnimatedStyle(() => {
        return {
            flex: statisticsTabFlex.value,
        };
    });

    const statisticsColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: statisticsTabColor.value,
        };
    });

    const notificationFlexStyle = useAnimatedStyle(() => {
        return {
            flex: notificationTabFlex.value,
        };
    });

    const notificationColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: notificationTabColor.value,
        };
    });

    React.useEffect(() => {
        dispatch(tabsSlice.actions.setSelectedTab(constants.screens.home));
    }, []);

    React.useEffect(() => {
        if (selectedTab == constants.screens.home) {
            flatListRef?.current?.scrollToIndex({
                index: 0,
                animated: false,
            });
            homeTabFlex.value = withTiming(4, { duration: 500 });
            homeTabColor.value = withTiming(COLORS.primary, { duration: 500 });
        } else {
            homeTabFlex.value = withTiming(1, { duration: 500 });
            homeTabColor.value = withTiming(COLORS.white, { duration: 500 });
        }

        if (selectedTab == constants.screens.group) {
            flatListRef?.current?.scrollToIndex({
                index: 1,
                animated: false,
            });
            groupTabFlex.value = withTiming(4, { duration: 500 });
            groupTabColor.value = withTiming(COLORS.primary, { duration: 500 });
        } else {
            groupTabFlex.value = withTiming(1, { duration: 500 });
            groupTabColor.value = withTiming(COLORS.white, { duration: 500 });
        }

        if (selectedTab == constants.screens.statistics) {
            flatListRef?.current?.scrollToIndex({
                index: 3,
                animated: false,
            });
            statisticsTabFlex.value = withTiming(4, { duration: 500 });
            statisticsTabColor.value = withTiming(COLORS.primary, { duration: 500 });
        } else {
            statisticsTabFlex.value = withTiming(1, { duration: 500 });
            statisticsTabColor.value = withTiming(COLORS.white, { duration: 500 });
        }

        if (selectedTab == constants.screens.project) {
            flatListRef?.current?.scrollToIndex({
                index: 2,
                animated: false,
            });
            managementTabFlex.value = withTiming(4, { duration: 500 });
            managementTabColor.value = withTiming(COLORS.primary, { duration: 500 });
        } else {
            managementTabFlex.value = withTiming(1, { duration: 500 });
            managementTabColor.value = withTiming(COLORS.white, { duration: 500 });
        }

        if (selectedTab == constants.screens.notification) {
            flatListRef?.current?.scrollToIndex({
                index: 4,
                animated: false,
            });
            notificationTabFlex.value = withTiming(4, { duration: 500 });
            notificationTabColor.value = withTiming(COLORS.primary, {
                duration: 500,
            });
        } else {
            notificationTabFlex.value = withTiming(1, { duration: 500 });
            notificationTabColor.value = withTiming(COLORS.white, { duration: 500 });
        }
    }, [selectedTab]);

    React.useEffect(() => {
        if (isDrawerOpen === "open") {
            scaleLayout.value = withTiming(0.8, { duration: 250 });
            borderRadiusLayout.value = withTiming(25, { duration: 250 });
        } else {
            scaleLayout.value = withTiming(1, { duration: 250 });
            borderRadiusLayout.value = withTiming(0, { duration: 250 });
        }
    }, [isDrawerOpen]);
    return (
        <Animated.View
            style={[
                {
                    flex: 1,
                    backgroundColor: COLORS.white,
                    paddingTop: 10,
                    overflow: "hidden",
                },
                scaleLayoutStyle,
                borderRadiusLayoutStyle,
            ]}
        >
            {/* header */}
            <Header
                containerStyle={{
                    height: 50,
                    paddingHorizontal: SIZES.radius * 1.5,
                    marginTop: 40,
                    alignItems: "center",
                }}
                title={selectedTab}
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: COLORS.gray,
                            borderRadius: SIZES.radius,
                            justifyContent: "center",
                        }}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image
                            source={icons.menu}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: "black",
                            }}
                        />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: SIZES.radius,
                        }}
                    >
                        <Image
                            source={dummyData.myProfile?.profile_image}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: SIZES.radius,
                            }}
                        />
                    </TouchableOpacity>
                }
            />
            {/* content */}

            <View style={{ flex: 1 }}>
                <FlatList
                    ref={flatListRef}
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    height: SIZES.height,
                                    width: SIZES.width,
                                }}
                            >
                                {item.label == constants.screens.home && (
                                    <Home navigation={navigation} />
                                )}
                                {item.label == constants.screens.group && (
                                    <Group navigation={navigation} />
                                )}
                                {item.label == constants.screens.project && (
                                    <Project navigation={navigation} />
                                )}
                                {item.label == constants.screens.statistics && <Statistics />}
                                {item.label == constants.screens.notification && (
                                    <Notification navigation={navigation} />
                                )}
                            </View>
                        );
                    }}
                />
            </View>

            {/* footer */}

            <View
                style={{
                    height: 100,
                    justifyContent: "flex-end",
                    width: "100%",
                }}
            >
                {/* shadow */}
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 4 }}
                    colors={[COLORS.transparent, COLORS.gray2]}
                    style={{
                        position: "absolute",
                        top: -20,
                        left: 0,
                        right: 0,
                        height: 100,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    }}
                />

                {/* Tabs */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        width: "100%",
                        paddingHorizontal: SIZES.radius,
                        paddingBottom: 10,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: COLORS.white,
                    }}
                >
                    <TabButton
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab == constants.screens.home}
                        outerContainerStyle={homeFlexStyle}
                        innerContainerStyle={homeColorStyle}
                        onPress={() =>
                            dispatch(tabsSlice.actions.setSelectedTab(constants.screens.home))
                        }
                    />
                    <TabButton
                        label={constants.screens.group}
                        icon={icons.group}
                        isFocused={selectedTab == constants.screens.group}
                        outerContainerStyle={groupFlexStyle}
                        innerContainerStyle={groupColorStyle}
                        onPress={() =>
                            dispatch(
                                tabsSlice.actions.setSelectedTab(constants.screens.group)
                            )
                        }
                    />
                    <TabButton
                        label={constants.screens.project}
                        icon={icons.management}
                        isFocused={selectedTab == constants.screens.project}
                        outerContainerStyle={managementFlexStyle}
                        innerContainerStyle={managementColorStyle}
                        onPress={() =>
                            dispatch(
                                tabsSlice.actions.setSelectedTab(constants.screens.project)
                            )
                        }
                    />
                    <TabButton
                        label={constants.screens.statistics}
                        icon={icons.chart}
                        isFocused={selectedTab == constants.screens.statistics}
                        outerContainerStyle={statisticsFlexStyle}
                        innerContainerStyle={statisticsColorStyle}
                        onPress={() =>
                            dispatch(
                                tabsSlice.actions.setSelectedTab(constants.screens.statistics)
                            )
                        }
                    />
                    <TabButton
                        label={constants.screens.notification}
                        icon={icons.bell}
                        isFocused={selectedTab == constants.screens.notification}
                        outerContainerStyle={notificationFlexStyle}
                        innerContainerStyle={notificationColorStyle}
                        onPress={() =>
                            dispatch(
                                tabsSlice.actions.setSelectedTab(constants.screens.notification)
                            )
                        }
                    />
                </View>
            </View>
        </Animated.View>
    );
};

export default MainLayout;
