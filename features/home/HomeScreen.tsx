import React from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";

import { NavigationScreenProp } from "react-navigation";

import { theme } from "../../styles";
import { HomeButton } from "../ui";

interface IProps {
    navigation: NavigationScreenProp<any, any>;
}

export class HomeScreen extends React.Component<IProps> {
    navigate = (route: string) => {
        this.props.navigation.navigate(route);
    };
    public render() {
        return (
            <View style={styles.container}>
                <Title style={styles.text}>Odin's Hall of Grooming</Title>
                <View style={styles.buttonRow}>
                    <HomeButton
                        icon="event"
                        text="Appointments"
                        onPress={() => this.navigate("Appointments")}
                    />
                    <HomeButton
                        icon="account-box"
                        text="Customers"
                        onPress={() => this.navigate("Customers")}
                    />
                </View>
                <View style={styles.buttonRow}>
                    <HomeButton
                        icon="pets"
                        text="Pets"
                        onPress={() => this.navigate("Pets")}
                    />
                    <HomeButton
                        icon="settings"
                        text="Settings"
                        onPress={() => this.navigate("Settings")}
                    />
                </View>
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
    buttonRow: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flexDirection: "row",
    },
});
