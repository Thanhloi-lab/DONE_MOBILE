import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons, dummyData } from "../constants";

const HorizontalGroupCard = ({ containerStyle, imageStyle, item, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "column",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary1,
                borderRadius: SIZES.radius * 2,
                margin: 10,

                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7,
            }}
            onPress={onPress}
        >
            {/* info */}
            <View style={{ flex: 1, padding: 15 }} numberOfLines={1}>
                {/* name */}
                <Text style={{ ...FONTS.h3 }}>{item.nameGroup}</Text>

                {/* description */}
                <Text
                    style={{ color: COLORS.darkGray1, ...FONTS.body4, fontSize: 12, lineHeight:12 }}
                    numberOfLines={1}
                >
                    {item.mailUserCreateGroup}
                </Text>

                <Text
                    style={{ marginTop: SIZES.base, ...FONTS.h3, fontSize: 14, lineHeight:14 }}
                    numberOfLines={1}
                >
                    {item.nameUserCreateGroup}
                </Text>

                <Text
                    style={{ marginTop: SIZES.base, ...FONTS.h3, fontSize: 14, lineHeight:14 }}
                    numberOfLines={1}
                >
                    {item.phoneUserCreateGroup}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default HorizontalGroupCard;
