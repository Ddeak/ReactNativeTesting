import React, { ReactNodeArray } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import {
    Avatar,
    TextInput,
    Chip,
    Dialog,
    Paragraph,
    Button,
} from "react-native-paper";

import { ICustomer, IPet } from "../../types";
import { theme } from "../../styles";
import { MainButton } from "../ui";
import { Actions, CustomerErrors } from "./reducer";

interface IPropsType {
    customer: ICustomer;
    dispatch: Function;
    loading: boolean;
    onDelete: () => void;
    onSubmit: () => void;
    onImageIconPress: () => void;
    showDeleteDialog: boolean;
    toggleDeleteDialog: () => void;
    errors: CustomerErrors;
}

const generatePetChips = (pets: IPet[]) => {
    const rows: ReactNodeArray = [];

    pets.forEach(pet => {
        const Avat = <Avatar.Text size={24} label={pet.name} />;
        rows.push(
            <Chip key={pet.id} avatar={Avat} style={styles.chip}>
                {pet.name}
            </Chip>
        );
    });

    return rows;
};

export const CustomerProfileView = (props: IPropsType) => {
    const {
        customer,
        dispatch,
        loading,
        onDelete,
        onSubmit,
        onImageIconPress,
        showDeleteDialog,
        toggleDeleteDialog,
        errors,
    } = props;
    const { firstName, surname, phoneNumber, id, pets, notes } = customer;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={onImageIconPress}>
                <Avatar.Text
                    label={`${firstName.charAt(0)}${surname.charAt(0)}`}
                />
            </TouchableOpacity>
            <TextInput
                style={styles.textInput}
                label="First Name"
                value={firstName}
                error={!!errors.firstName}
                onChangeText={text => dispatch(Actions.setFirstName(text))}
            />
            <TextInput
                style={styles.textInput}
                label="Surname"
                value={surname}
                error={!!errors.surname}
                onChangeText={text => dispatch(Actions.setSurname(text))}
            />
            <TextInput
                style={styles.textInput}
                label="Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                error={!!errors.phoneNumber}
                onChangeText={text => dispatch(Actions.setPhoneNumber(text))}
            />
            <TextInput
                style={styles.textInput}
                multiline
                label="Notes"
                value={notes}
                onChangeText={text => dispatch(Actions.setNotes(text))}
            />
            <View style={styles.petsRow}>
                {pets ? generatePetChips(pets) : null}
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
                    disabled={loading}
                    text={id ? "Edit" : "Create"}
                    onPress={onSubmit}
                />
            </View>

            <Dialog visible={showDeleteDialog} onDismiss={toggleDeleteDialog}>
                <Dialog.Title>Warning</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>
                        Are you sure you wish to delete this customer?
                    </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={toggleDeleteDialog}>No</Button>
                    <Button onPress={onDelete}>Yes</Button>
                </Dialog.Actions>
            </Dialog>
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
        paddingVertical: 10,
    },
    textInput: {
        marginTop: 10,
        minHeight: 60,
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
    petsRow: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: "wrap",
        paddingTop: 10,
    },
    chip: {
        marginTop: 10,
        marginHorizontal: 5,
    },
});
