import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";

import { theme } from "../../styles";
import { MainButton, LoadingScreen, CustomerChip } from "../ui";

import { usePet } from "./hooks";
import { Actions } from "./reducer";
import { ICustomer } from "../../types";
import { PetService } from "../../db";

interface IPropsType {
    navigation: NavigationScreenProp<any, any>;
}

export const PetProfile = ({ navigation }: IPropsType) => {
    const id = navigation.getParam("id");
    const onDone = navigation.getParam("onDone");
    const [state, dispatch] = usePet(id);
    const { name, breed, owner, loading } = state;

    if (loading) return <LoadingScreen />;

    const onDelete = async () => {
        dispatch(Actions.setLoading(true));
        try {
            PetService.delete(id);
            if (onDone) onDone();
            navigation.pop();
            dispatch(Actions.setLoading(false));
        } catch (err) {
            console.log("Something went wrong deleting a customer: ");
            dispatch(Actions.setLoading(false));
        }
    };

    const onSubmit = async () => {
        dispatch(Actions.setLoading(true));
        try {
            PetService.save({ id, name, breed, owner });

            if (onDone) onDone();
            navigation.pop();
            dispatch(Actions.setLoading(false));
        } catch (err) {
            console.log("Something went wrong creating a customer: ", err);
            dispatch(Actions.setLoading(false));
        }
    };
    const onAddCustomer = () => {
        navigation.push("CustomerList", {
            onRowPress: (customer: ICustomer) => {
                dispatch(Actions.setOwner(customer));
                navigation.pop();
            },
        });
    };

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
                        onPress={onDelete}
                    />
                )}
                <MainButton
                    icon="create"
                    disabled={loading || !owner}
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
