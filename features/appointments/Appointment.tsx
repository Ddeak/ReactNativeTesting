import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";

import { theme } from "../../styles";
import { MainButton, LoadingScreen, CustomerChip } from "../ui";

import { useAppointment } from "./hooks";
import { Actions } from "./reducer";
import { ICustomer } from "../../types";
import { PetService } from "../../db";

interface IPropsType {
    navigation: NavigationScreenProp<any, any>;
}

export const Appointment = ({ navigation }: IPropsType) => {
    const id = navigation.getParam("id");
    const [state, dispatch] = useAppointment(id);
    const { duration, loading } = state;

    if (loading) return <LoadingScreen />;

    const onDelete = async () => {};

    const onSubmit = async () => {};

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                label="Duration"
                value={`${duration}`}
                onChangeText={text => {
                    let newDuration = Number.parseInt(text);
                    if (Number.isNaN(newDuration)) newDuration = 0;
                    dispatch(Actions.setDuration(newDuration));
                }}
            />
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
});
