import React from "react";
import { View, StyleSheet } from "react-native";
import { withNavigation, NavigationScreenProp } from "react-navigation";
import { TextInput } from "react-native-paper";

import { theme } from "../../styles";
import { LoadingScreen } from "../ui/LoadingScreen";
import { MainButton } from "../ui/MainButton";

import { useCustomer } from "./hooks";
import { CustomerService } from "../../db";
import { Actions } from "./reducer";

interface IPropType {
    navigation: NavigationScreenProp<any, any>;
}

export const CustomerProfile = withNavigation(({ navigation }: IPropType) => {
    const id = navigation.getParam("id");
    const onDone = navigation.getParam("onDone");
    const [state, dispatch] = useCustomer(id);
    const { firstName, surname, phoneNumber, loading } = state;

    if (loading) return <LoadingScreen />;

    const onSubmit = async () => {
        dispatch(Actions.setLoading(true));
        try {
            CustomerService.save({ id, firstName, surname, phoneNumber });

            if (onDone) onDone();
            navigation.pop();
            dispatch(Actions.setLoading(false));
        } catch (err) {
            console.log("Something went wrong creating a customer: ", err);
            dispatch(Actions.setLoading(false));
        }
    };

    const onDelete = async () => {
        dispatch(Actions.setLoading(true));
        try {
            CustomerService.delete(id);
            if (onDone) onDone();
            navigation.pop();
            dispatch(Actions.setLoading(false));
        } catch (err) {
            console.log("Something went wrong deleting a customer: ");
            dispatch(Actions.setLoading(false));
        }
    };

    return (
        <View style={styles.container}>
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
});

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
