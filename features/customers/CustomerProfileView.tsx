import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, TextInput } from "react-native-paper";

import { ICustomer } from "../../types";
import { theme } from "../../styles";
import { MainButton } from "../ui";
import { Actions } from "./reducer";

interface IPropsType {
    customer: ICustomer;
    dispatch: Function;
    loading: boolean;
    onDelete: () => void;
    onSubmit: () => void;
    onImageIconPress: () => void;
}

export const CustomerProfileView = (props: IPropsType) => {
    const {
        customer,
        dispatch,
        loading,
        onDelete,
        onSubmit,
        onImageIconPress,
    } = props;
    const { firstName, surname, phoneNumber, id } = customer;
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onImageIconPress}>
                <Avatar.Text
                    label={`${firstName.charAt(0)}${surname.charAt(0)}`}
                />
            </TouchableOpacity>
            <TextInput
                style={styles.textInput}
                label="First Name"
                value={firstName}
                onChangeText={text => dispatch(Actions.setFirstName(text))}
            />
            <TextInput
                style={styles.textInput}
                label="Surname"
                value={surname}
                onChangeText={text => dispatch(Actions.setSurname(text))}
            />
            <TextInput
                style={styles.textInput}
                label="Phone Number"
                value={phoneNumber}
                onChangeText={text => dispatch(Actions.setPhoneNumber(text))}
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
                    disabled={loading}
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
        paddingVertical: 10,
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
