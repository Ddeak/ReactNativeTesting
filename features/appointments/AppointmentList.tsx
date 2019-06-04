import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { FAB, Text } from "react-native-paper";

import { theme } from "../../styles";
import { useAppointments } from "./hooks";

import { ListHeader } from "./ListHeader";
import { IAppointment } from "../../types";

interface IListProps {
    navigation: NavigationScreenProp<any, any>;
}

interface IRowProps {
    item: IAppointment;
}

const renderAppointmentRow = (
    { item }: IRowProps,
    onPress: (id?: string) => void
) => {
    return (
        <TouchableOpacity style={styles.row} onPress={() => onPress(item.id)}>
            <Text>
                {`${item.date}`} - {item.customer.firstName}
            </Text>
        </TouchableOpacity>
    );
};

export const AppointmentList = ({ navigation }: IListProps) => {
    const [refresh, setRefresh] = useState(false);
    const [date, setDate] = useState(new Date());
    const appointments = useAppointments(refresh, date);

    const onDone = () => {
        setRefresh(!refresh);
    };

    const onRowPress = (id?: string) => {
        navigation.push("Appointment", { id, onDone });
    };

    const toggleDate = (days: number) => {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate);
        setRefresh(!refresh);
    };

    return (
        <View style={styles.container}>
            <ListHeader date={date} toggleDate={toggleDate} />
            <FlatList
                data={appointments}
                renderItem={item => renderAppointmentRow(item, onRowPress)}
                keyExtractor={(_item, index) => `${index}`}
            />
            <FAB style={styles.fab} icon="add" onPress={() => onRowPress()} />
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
    row: {
        flex: 1,
        height: 30,
        width: 250,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.SECONDARY_COLOR,
    },
});
