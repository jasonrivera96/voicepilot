import React from "react";
import { Text, View } from "react-native";
import Constants from "expo-constants";

const Main = () => {
    return (
        <View style={{ marginTop: Constants.statusBarHeight}}>
            <Text>
                Hi! Welcome to Voiceplot! :D
            </Text>
        </View>
    )
}

export default Main