import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { withNavigation, NavigationScreenProp } from "react-navigation";
import { ActivityIndicator } from "react-native-paper";

import { theme } from "../../styles";
import { LoadingScreen } from "../ui/LoadingScreen";
import { useCustomer } from "./hooks";

interface PropType {
    navigation: NavigationScreenProp<any, any>;
}

export const CustomerProfile = withNavigation((props: PropType) => {
    const customer = useCustomer(props.navigation.getParam("id"));

    if (customer) {
        return (
            <View style={styles.container}>
                <Text>{customer.firstName}</Text>
            </View>
        );
    }

    return <LoadingScreen />;
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.SCREEN_BACKGROUND,
    },
});
