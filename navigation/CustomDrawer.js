import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import MainLayout from "../screens/MainLayout";

import { COLORS, FONTS, SIZES, icons, dummyData, constants } from '../constants';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabAction';
import Animated from "react-native-reanimated";

const Drawer = createDrawerNavigator();

const STYLES = { default: 'default', lightMode: 'dark-content', darkMode: 'light-content' };

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                marginVertical: SIZES.base / 2,
                alignItems: 'center',
                paddingLeft: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: isFocused ? COLORS.transparentBlack : null
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white,
                }}
            />

            <Text
                style={{
                    marginLeft: 10,
                    color: COLORS.white,
                    ...FONTS.h3
                }}
            >
                {label}
            </Text>

        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab }) => {


    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{ flex: 1 }}
        >
            <Animated.View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.radius,
                    paddingTop: 10,
                }}
            >
                {/* close button */}
                <View
                    style={{
                        alignItems: "flex-start",
                        justifyContent: "center"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress={() => {
                            navigation.closeDrawer();
                            // setToggleDrawer(0);
                        }}
                    >
                        <Image
                            source={icons.cross}
                            style={{
                                height: 25,
                                width: 25,
                                tintColor: COLORS.white
                            }}
                        >
                        </Image>
                    </TouchableOpacity>
                </View>

                {/* profile */}
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        marginTop: SIZES.radius,
                        alightItems: 'center'
                    }}
                    onPress={() => console.log('profile')}
                >
                    <Image
                        source={dummyData.myProfile?.profile_image}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: SIZES.radius
                        }}
                    />
                    <View
                        style={{
                            marginLeft: SIZES.radius
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                            {dummyData.myProfile?.name}
                        </Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
                            View your profile
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* drawer items */}

                <View
                    style={{
                        flex: 1,
                        marginTop: SIZES.padding * 2
                    }}
                >
                    <CustomDrawerItem
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab == constants.screens.home}
                        onPress={() => {
                            setSelectedTab(constants.screens.home);
                            navigation.navigate("MainLayout")
                        }}
                    />

                    <CustomDrawerItem
                        label={constants.screens.group}
                        icon={icons.group}
                        isFocused={selectedTab == constants.screens.group}
                        onPress={() => {
                            setSelectedTab(constants.screens.group);
                            navigation.navigate("MainLayout")
                        }}
                    />

                    <CustomDrawerItem
                        label={constants.screens.management}
                        icon={icons.management}
                        isFocused={selectedTab == constants.screens.management}
                        onPress={() => {
                            setSelectedTab(constants.screens.management);
                            navigation.navigate("MainLayout")
                        }}
                    />

                    <CustomDrawerItem
                        label={constants.screens.statistics}
                        icon={icons.chart}
                        isFocused={selectedTab == constants.screens.statistics}
                        onPress={() => {
                            setSelectedTab(constants.screens.statistics);
                            navigation.navigate("MainLayout")
                        }}
                    />

                    <CustomDrawerItem
                        label={constants.screens.notification}
                        icon={icons.bell}
                        isFocused={selectedTab == constants.screens.notification}
                        onPress={() => {
                            setSelectedTab(constants.screens.notification);
                            navigation.navigate("MainLayout")
                        }}
                    />

                    {/* line divider */}
                    <View
                        style={{
                            height: 1,
                            marginVertical: SIZES.radius,
                            marginLeft: SIZES.radius,
                            backgroundColor: COLORS.lightGray
                        }}
                    />

                    <CustomDrawerItem
                        label='Setting'
                        icon={icons.setting}
                    />

                    <CustomDrawerItem
                        label='Help center'
                        icon={icons.help}
                    />
                </View>

                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <CustomDrawerItem
                        label="Layout"
                        icon={icons.logout}
                    />
                </View>
            </Animated.View>
        </DrawerContentScrollView>
    )
}

const CustomDrawer = ({ selectedTab, setSelectedTab, navigation }) => {

    const [statusBarStyle, setStatusBarStyle] = React.useState(STYLES.lightMode);

    const changeStatusBarStyle = (mode) => {
        setStatusBarStyle(STYLES[mode])
    };

    StatusBar.setBarStyle(statusBarStyle);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.primary
            }}
        >
            <Drawer.Navigator
                initialRouteName="MainLayout"
                screenOptions={{
                    swipeEnabled: false,
                    headerShown: false,
                    drawerType: "slide",
                    overlayColor: "transparent",
                    drawerStyle: {
                        flex: 1,
                        width: '65%',
                        paddingRight: 20,
                        backgroundColor: 'transparent',
                    },
                    sceneContainerStyle: {
                        backgroundColor: 'transparent',
                    }
                }}
                drawerContent={props => {
                    return (
                        <CustomDrawerContent
                            navigation={props.navigation}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                        />
                    )
                }}
            >
                <Drawer.Screen name="MainLayout">
                    {props => <MainLayout
                        {...props}
                        navigation={navigation}
                    />}
                </Drawer.Screen>
            </Drawer.Navigator>
        </View >
    )
}

function mapStateToProps(state) {
    return {
        selectedTab: state.tabReducer.selectedTab,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedTab: (selectedTab) => {
            return dispatch(setSelectedTab(selectedTab));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)