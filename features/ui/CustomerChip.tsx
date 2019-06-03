import React from "react";
import { View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

import { MainButton } from "./MainButton";
import { ICustomer } from "../../types";

interface IPropsType {
    customer: ICustomer;
    onPress?: () => void;
    onClose?: () => void;
    onAddCustomer: () => void;
}

export const CustomerChip = ({
    customer,
    onPress,
    onClose,
    onAddCustomer,
}: IPropsType) => {
    return (
        <View style={styles.addCustomerButtonView}>
            {customer ? (
                <Chip
                    style={{ marginTop: 15 }}
                    onPress={onPress}
                    onClose={onClose}
                >
                    {customer.firstName} {customer.surname}
                </Chip>
            ) : (
                <MainButton
                    icon="add"
                    style={styles.addCustomerButton}
                    text="Add Customer"
                    onPress={onAddCustomer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    addCustomerButton: {
        width: 250,
    },
    addCustomerButtonView: {
        height: 75,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});
