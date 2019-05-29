import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { theme } from "../../styles";

export const LoadingScreen = () => (
    <View style={styles.container}>
        <ActivityIndicator animating={true} />
        <Text style={styles.text}>Loading...</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        paddingTop: 20,
        backgroundColor: theme.SCREEN_BACKGROUND,
    },
    text: {
        color: "white",
        marginTop: 5,
    },
});
