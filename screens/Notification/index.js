import {FlatList,Text, View } from "react-native";
import {dummyData,SIZES,COLORS} from '../../constants';
import React from "react";
import {HorizontalNotificationCard} from "../../components"

const Notification = ({navigation}) => {
  return (
    <View
        style={{ flex: 1}}
    >
        
        <FlatList
            style={{ flex: 1 }}
            vertical
            data={dummyData.notification}
            keyExtractor={(item,index) => index}
            showsVerticalScrollIndicator={false}
           
            renderItem={({ item, index }) => {
                return (
                    <HorizontalNotificationCard
                        containerStyle={{
                            justifyContent:'center',
                            marginHorizontal: SIZES.padding,
                            marginBottom:  SIZES.radius,
                            
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
                            navigation.navigate(item.type,{groupId : item.idGroup})
                        }}
                    />
                    
                )
            }}
        />
    </View>
)
};

export default Notification;
