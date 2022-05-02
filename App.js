import 'react-native-gesture-handler';
import React from 'react';
import { ActivityIndicator, View } from "react-native";
import LoadFonts from './LoadFonts';
import Wrapper from './Wrapper';
import { Provider } from 'react-redux';
import store from './redux/store'

export default function App() {
    const [isLoaded] = LoadFonts();

    if (!isLoaded) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#fe6332"/> 
            </View>
        )
    } 
    else 
    {
        return (
            <Provider store={store}>
                <Wrapper/>
            </Provider>
        );
    }
}
