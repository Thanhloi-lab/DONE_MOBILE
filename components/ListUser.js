import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import { FONTS, COLORS, SIZES, icons } from '../constants';

const ListUser = ({ containerStyle, item }) => {
    return (
        <TouchableOpacity
            style={{ ...containerStyle }}
        >
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'center', paddingLeft:20}}>
                <View style={{ width: '10%'}}>
                    {toggle &&
                        <Image
                            source={icons.status}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.COMPLETED1
                            }}
                        />
                    }
                </View>
                <View style={{width:'90%' }}>
                    <View style={{ flex: 1, padding: 10 }} numberOfLines={1}>
                        {/* name */}
                        <Text style={{ ...FONTS.h2, fontSize: 16, lineHeight: 16 }}>
                            {item.Mail}
                        </Text>

                        {/* description */}
                        <Text style={{ color: COLORS.darkGray1, ...FONTS.body4, fontSize: 15, lineHeight: 15 }} numberOfLines={1}>
                            {item.Name}
                        </Text>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListUser;