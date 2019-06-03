import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { FAB, Title } from "react-native-paper";

import { theme } from "../../styles";

import { ListHeader } from "./ListHeader";

interface IListProps {
    navigation: NavigationScreenProp<any, any>;
}

export const AppointmentList = ({ navigation }: IListProps) => {
    const [date, setDate] = useState(new Date());
    // const appointmentsc = useAppointments(refresh, filter);

    const onDone = () => {};
    const onNewClick = () => {
        navigation.push("Appointment");
    };
    const toggleDate = (days: number) => {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate);
    };

    return (
        <View style={styles.container}>
            <ListHeader date={date} toggleDate={toggleDate} />
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
