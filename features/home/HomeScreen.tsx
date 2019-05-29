import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { NavigationScreenProp } from "react-navigation";

import { theme } from "../../styles";
import { MainButton } from "../ui/MainButton";

interface IProps {
    navigation: NavigationScreenProp<any, any>;
}

export class HomeScreen extends React.Component<IProps> {
    public render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Odin's Hall</Text>
                <MainButton
                    text="Appointments"
                    onPress={() => this.props.navigation.navigate("Drawer")}
                />
                <MainButton
                    text="Customers"
                    onPress={() => this.props.navigation.navigate("Customers")}
                />
                <MainButton
                    text="Pets"
                    onPress={() => this.props.navigation.navigate("Pets")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.SCREEN_BACKGROUND,
    },
    text: {
        color: theme.SECONDARY_COLOR,
    },
});
