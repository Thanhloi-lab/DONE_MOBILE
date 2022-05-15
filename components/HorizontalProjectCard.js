import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons, dummyData } from "../constants";

const HorizontalProjectCard = ({
    containerStyle,
    imageStyle,
    item,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "column",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.UNCOMPLETED,
                borderRadius: SIZES.radius * 2,
                // margin: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7,

                ...containerStyle,
            }}
            onPress={onPress}
        >
            {/* status */}

            {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                    <Image
                        source={icons[dummyData.STATUS[dummyData.STATUS_ID[item.statusId]]]}
                        style={{
                            width: 20,
                            height: 20,
                            marginRight: 5
                        }}
                    />
                    <Text style={{ color: COLORS.darkGray1, ...FONTS.body5 }}>
                        {dummyData.STATUS_ID[item.statusId]}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={icons.unPin}
                        style={{
                            width: 25,
                            height: 25,
                            marginRight: 5,
                        }}
                    />
                </View>
            </View> */}

            {/* info */}
            <View style={{ flex: 1, padding: 15 }} numberOfLines={1}>
                {/* name */}
                <Text style={{ ...FONTS.h3 }}>Project: {item.nameProject}</Text>

                {/* description */}
                <Text
                    style={{color:'#000000', marginTop: SIZES.base, ...FONTS.h3, fontSize: 14, lineHeight:14}}
                    numberOfLines={1}
                >
                    Email creator: {item.mail}
                </Text>

                <Text
                    style={{ marginTop: SIZES.base, ...FONTS.h3, fontSize: 14, lineHeight:14 }}
                    numberOfLines={1}
                >
                    Creator: {item.name}
                </Text>

                <Text
                    style={{ marginTop: SIZES.base, ...FONTS.h3, fontSize: 14, lineHeight:14 }}
                    numberOfLines={1}
                >
                    Phone's creator: {item.phone}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default HorizontalProjectCard;
