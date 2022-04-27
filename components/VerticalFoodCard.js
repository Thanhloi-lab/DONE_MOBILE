import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants'

const VerticalFoodCard = ({ containerStyle, item, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                width: 200,
                padding: SIZES.radius,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...containerStyle
            }}
        >
            {/* Calories and favorite */}
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={icons.calories}
                        style={{
                            width: 25,
                            height: 25,
                            marginRight: 5,
                        }}
                    />
                    <Text style={{ color: COLORS.darkGray1, ...FONTS.body5 }}>
                        {item.calories} Calories
                    </Text>
                </View>

                {/* favorite */}
                <Image
                    source={icons.heart}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: item.isFavorite ? COLORS.primary : COLORS.gray
                    }}
                />
            </View>



            {/* image */}
            <View
                style={{
                    height: 200,
                    width: 200,
                    padding: SIZES.radius,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={item.image}
                    style={{ height: "100%", width: "100%", borderRadius: SIZES.radius }}
                />
            </View>

            {/* info */}
            <View
                style={{
                    alignItems: "center",
                }}
            >
                <Text style={{ ...FONTS.h3 }}>{item.name}</Text>
                <Text style={{ color: COLORS.darkGray1, textAlign: "center" }}>
                    {item.description}
                </Text>
                <Text style={{ marginTop: SIZES.radius, ...FONTS.h2 }}>
                    ${item.price}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default VerticalFoodCard;