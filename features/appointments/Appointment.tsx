import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Dialog, Paragraph, Button } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";

import { ICustomer, AppointmentStatus } from "../../types";
import { theme } from "../../styles";
import { LoadingScreen, DatePicker, CustomerChip, MainButton } from "../ui";

import { useAppointment } from "./hooks";
import { Actions } from "./reducer";
import { AppointmentService } from "../../db";
import { AppointmentStatusSelect } from "./AppointmentStatusSelect";

interface IPropsType {
    navigation: NavigationScreenProp<any, any>;
}

export const Appointment = ({ navigation }: IPropsType) => {
    const id = navigation.getParam("id");
    const [state, dispatch] = useAppointment(id);
    const [showDeleteDialog, setDialog] = useState(false);
    const { date, customer, duration, status, loading } = state;

    if (loading) return <LoadingScreen />;

    const onDelete = () => {
        dispatch(Actions.setLoading(true));
        try {
            AppointmentService.delete(id);
            navigation.pop();
        } catch (err) {
            console.log("Something went wrong deleting an appointment: ", err);
            dispatch(Actions.setLoading(false));
        }
    };

    const onSubmit = () => {
        dispatch(Actions.setLoading(true));
        try {
            AppointmentService.save({ id, date, customer, duration, status });

            dispatch(Actions.setLoading(false));
            navigation.pop();
        } catch (err) {
            console.log("Something went wrong creating an appointment: ", err);
            dispatch(Actions.setLoading(false));
        }
    };

    const onAddCustomer = () => {
        navigation.push("CustomerList", {
            onRowPress: (customer: ICustomer) => {
                dispatch(Actions.setCustomer(customer));
                navigation.pop();
            },
        });
    };

    const toggleDeleteDialog = () => setDialog(!showDeleteDialog);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <DatePicker
                    date={date}
                    handleDatePicked={date => dispatch(Actions.setDate(date))}
                />
                <TextInput
                    style={styles.textInput}
                    label="Duration (Hours)"
                    value={`${duration}`}
                    onChangeText={text => {
                        let newDuration = Number.parseInt(text);
                        if (Number.isNaN(newDuration)) newDuration = 0;
                        dispatch(Actions.setDuration(newDuration));
                    }}
                />
                {id && (
                    <AppointmentStatusSelect
                        activeStatus={status}
                        onPress={status => dispatch(Actions.setStatus(status))}
                    />
                )}
                <CustomerChip
                    customer={customer}
                    onClose={() => dispatch(Actions.setCustomer())}
                    onAddCustomer={onAddCustomer}
                />
            </View>
            <View style={styles.buttonRow}>
                {id && (
                    <MainButton
                        icon="delete"
                        style={styles.deleteButton}
                        disabled={loading}
                        text={"Delete"}
                        onPress={toggleDeleteDialog}
                    />
                )}
                <MainButton
                    icon="create"
                    disabled={loading || !customer}
                    text={id ? "Edit" : "Create"}
                    onPress={onSubmit}
                />
            </View>

            <Dialog visible={showDeleteDialog} onDismiss={toggleDeleteDialog}>
                <Dialog.Title>Warning</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>
                        Are you sure you wish to delete this appointment?
                    </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={toggleDeleteDialog}>No</Button>
                    <Button onPress={onDelete}>Yes</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.SCREEN_BACKGROUND,
        paddingVertical: 5,
    },
    content: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    textInput: {
        marginTop: 10,
        height: 60,
        width: "90%",
    },
    buttonRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    deleteButton: {
        backgroundColor: theme.DELETE_COLOR,
    },
});
