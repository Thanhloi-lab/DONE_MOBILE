import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, dummyData } from '../constants'

const HorizontalNotificationCard = ({ containerStyle, imageStyle, item, onPress }) => {
    return (
        <TouchableOpacity
        style={{
            flexDirection: 'column',
            borderRadius: SIZES.radius,
            backgroundColor: COLORS[item.color],
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

      
        {/* info */}
        <View style={{ flex: 1, padding: 15 }} numberOfLines={1}>
            {/* name */}
            <Text style={{ ...FONTS.h2, fontSize:18, lineHeight:20 }}>
                {item.title}
            </Text>

            {/* description */}
            <Text style={{ color: COLORS.darkGray1, ...FONTS.body4, fontSize: 14, lineHeight:16 }} numberOfLines={1}>
                {item.content}
            </Text>

            <Text style={{ marginTop: SIZES.base,  fontSize: 14, lineHeight:16 }} numberOfLines={1}>
                Project: {item.nameProject}
            </Text>
        </View>
    </TouchableOpacity>


    )
}

export default HorizontalNotificationCard;