import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Dialog, Paragraph, Button } from "react-native-paper";

import { theme } from "../../styles";

import { CustomerChip, MainButton } from "../ui";
import { IPet } from "../../types";
import { Actions } from "./reducer";

interface IPropsType {
    pet: IPet;
    dispatch: Function;
    loading: boolean;
    onSubmit: () => void;
    onDelete: () => void;
    onAddCustomer: () => void;
    showDeleteDialog: boolean;
    toggleDeleteDialog: () => void;
}

export const PetProfileView = (props: IPropsType) => {
    const {
        pet,
        dispatch,
        loading,
        onSubmit,
        onDelete,
        onAddCustomer,
        showDeleteDialog,
        toggleDeleteDialog,
    } = props;
    const { id, name, breed, notes, owner } = pet;
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                label="Name"
                value={name}
                onChangeText={text => dispatch(Actions.setName(text))}
            />
            <TextInput
                style={styles.textInput}
                label="Breed"
                value={breed}
                onChangeText={text => dispatch(Actions.setBreed(text))}
            />

            <TextInput
                style={styles.textInput}
                multiline
                label="Notes"
                value={notes}
                onChangeText={text => dispatch(Actions.setNotes(text))}
            />

            <CustomerChip
                customer={owner}
                onClose={() => dispatch(Actions.setOwner())}
                onAddCustomer={onAddCustomer}
            />

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
                    disabled={loading || !owner}
                    text={id ? "Edit" : "Create"}
                    onPress={onSubmit}
                />
            </View>

            <Dialog visible={showDeleteDialog} onDismiss={toggleDeleteDialog}>
                <Dialog.Title>Warning</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>
                        Are you sure you wish to delete this pet?
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
