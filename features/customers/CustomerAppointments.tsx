import React, { useState } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
import { Text, Avatar, FAB, Title } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";
import moment from "moment";

import { useCustomerAppointments, useCustomer } from "./hooks";
import { theme } from "../../styles";
import { IAppointment, AppointmentStatus } from "../../types";

interface IPropsType {
    navigation: NavigationScreenProp<any, any>;
}

interface IRowProps {
    item: IAppointment;
}

const formatDate = (date: Date): string => {
    const m = moment(date);
    return `${m.format("LLL")}`;
};

const getStatusStyle = (status: AppointmentStatus): Object => {
    switch (status) {
        case AppointmentStatus.Canceled:
            return styles.canceledAppointment;
        case AppointmentStatus.Late:
            return styles.lateAppointment;
        case AppointmentStatus.NOSHOW:
            return styles.noShowAppointment;
        default:
            return {};
    }
};

const renderAppointmentRow = ({ item }: IRowProps) => {
    const statusStyle = getStatusStyle(item.status);

    return (
        <View style={[styles.appointmentRow, statusStyle]}>
            <Text>{formatDate(item.date)}</Text>
        </View>
    );
};

export const CustomerAppointments = ({ navigation }: IPropsType) => {
    const [refresh, setRefresh] = useState(false);
    const customerId: string = navigation.getParam("id");

    const [state, dispatch] = useCustomer(customerId);
    const { firstName, surname } = state;
    const customerAppointments = useCustomerAppointments(customerId, refresh);

    const onEdit = () => {
        navigation.push("CustomerProfile", { id: customerId });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.avatarRow}>
                <Avatar.Text
                    label={`${firstName.charAt(0)}${surname.charAt(0)}`}
                />
            </View>
            <Title style={styles.title}>Appointments:</Title>
            <FlatList
                data={customerAppointments}
                renderItem={item => renderAppointmentRow(item)}
                keyExtractor={(_item, index) => `${index}`}
            />
            <FAB style={styles.fab} icon="edit" onPress={onEdit} />
        </ScrollView>
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
    appointmentRow: {
        flex: 1,
        height: 35,
        width: 250,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.SECONDARY_COLOR,
        borderRadius: 5,
    },
    avatarRow: {
        flexDirection: "row",
        padding: 10,
        width: "90%",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    title: {
        color: theme.SECONDARY_COLOR,
        marginBottom: 5,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
    lateAppointment: {
        backgroundColor: theme.LATE_APPT_COLOR,
    },
    noShowAppointment: {
        backgroundColor: theme.NO_SHOW_APPT_COLOR,
    },
    canceledAppointment: {
        backgroundColor: theme.DELETE_COLOR,
    },
});
