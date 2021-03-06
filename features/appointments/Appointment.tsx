import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";

import { ICustomer } from "../../types";
import { theme } from "../../styles";
import { LoadingScreen, DatePicker, CustomerChip, MainButton } from "../ui";

import { useAppointment } from "./hooks";
import { Actions } from "./reducer";
import { AppointmentService } from "../../db";

interface IPropsType {
    navigation: NavigationScreenProp<any, any>;
}

export const Appointment = ({ navigation }: IPropsType) => {
    const id = navigation.getParam("id");
    const onDone = navigation.getParam("onDone");
    const [state, dispatch] = useAppointment(id);
    const { date, customer, duration, loading } = state;

    if (loading) return <LoadingScreen />;

    const onDelete = () => {
        dispatch(Actions.setLoading(true));
        try {
            AppointmentService.delete(id);
            if (onDone) onDone();
            dispatch(Actions.setLoading(false));
            navigation.pop();
        } catch (err) {
            console.log("Something went wrong deleting an appointment: ", err);
            dispatch(Actions.setLoading(false));
        }
    };

    const onSubmit = () => {
        dispatch(Actions.setLoading(true));
        try {
            AppointmentService.save({ id, date, customer, duration });

            if (onDone) onDone();
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

    return (
        <View style={styles.container}>
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
            <CustomerChip
                customer={customer}
                onClose={() => dispatch(Actions.setCustomer())}
                onAddCustomer={onAddCustomer}
            />
            <View style={styles.buttonRow}>
                {id && (
                    <MainButton
                        icon="delete"
                        style={styles.deleteButton}
                        disabled={loading}
                        text={"Delete"}
                        onPress={onDelete}
                    />
                )}
                <MainButton
                    icon="create"
                    disabled={loading || !customer}
                    text={id ? "Edit" : "Create"}
                    onPress={onSubmit}
                />
            </View>
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
        paddingVertical: 5,
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
