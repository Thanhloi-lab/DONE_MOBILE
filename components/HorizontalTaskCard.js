import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, dummyData } from '../constants'

const HorizontalTaskCard = ({ containerStyle, imageStyle, item, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'column',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS[dummyData.STATUS_ID[item.statusId]],
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7,
                borderRadius: SIZES.radius * 2,
                ...containerStyle,
                
            }}
            onPress={onPress}
        >
            {/* status */}

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop:10, paddingBottom:5 }}>
                {/* favorite */}
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
            </View>

            {/* info */}
            <View style={{ flex: 1, padding: 15, paddingTop: 0 }} numberOfLines={1}>
                {/* name */}
                <Text style={{ ...FONTS.h2, fontSize:15, lineHeight:17 }}>
                    Task: {item.nameTask}
                </Text>

                {/* description */}
                <Text style={{ color: COLORS.darkGray1, ...FONTS.body4, fontSize: 13, lineHeight:14 }} numberOfLines={1}>
                    {item.content}
                </Text>

                <Text style={{ marginTop: SIZES.base, ...FONTS.h2, fontSize: 13, lineHeight:14 }} numberOfLines={1}>
                    Project: {item.nameProject}
                </Text>
            </View>
        </TouchableOpacity>


    )
}

export default HorizontalTaskCard;