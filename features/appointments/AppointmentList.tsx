import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { FAB } from "react-native-paper";

import { theme } from "../../styles";

interface IListProps {
    navigation: NavigationScreenProp<any, any>;
}

export const AppointmentList = ({ navigation }: IListProps) => {
    // const customers = useAppointments(refresh, filter);

    const onDone = () => {};
    const onNewClick = () => {
        navigation.push("Appointment");
    };

    return (
        <View style={styles.container}>
            <FAB style={styles.fab} icon="add" onPress={onNewClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.SCREEN_BACKGROUND,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
