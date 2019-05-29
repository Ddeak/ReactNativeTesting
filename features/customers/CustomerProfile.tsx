import React from "react";
import { View, StyleSheet } from "react-native";
import { withNavigation, NavigationScreenProp } from "react-navigation";
import { TextInput } from "react-native-paper";

import { theme } from "../../styles";
import { LoadingScreen } from "../ui/LoadingScreen";
import { MainButton } from "../ui/MainButton";

import { useCustomer } from "./hooks";
import { editCustomer, createCustomer } from "./api";
import { Actions } from "./reducer";

interface PropType {
    navigation: NavigationScreenProp<any, any>;
}

export const CustomerProfile = withNavigation(({ navigation }: PropType) => {
    const _id = navigation.getParam("id");
    const onDone = navigation.getParam("onDone");
    const [state, dispatch] = useCustomer(_id);
    const { firstName, surname, phoneNumber, loading } = state;

    if (loading) return <LoadingScreen />;

    const onSubmit = async () => {
        dispatch(Actions.setLoading(true));
        try {
            const data = _id
                ? await editCustomer({ _id, firstName, surname, phoneNumber })
                : await createCustomer({ firstName, surname, phoneNumber });

            if (onDone) onDone();
            if (data.method === "Success") navigation.pop();
            dispatch(Actions.setLoading(false));
        } catch (err) {
            console.log("Something went wrong creating a customer: ");
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
            <MainButton
                disabled={loading}
                text={_id ? "Edit" : "Create"}
                onPress={() => onSubmit()}
            />
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
});
