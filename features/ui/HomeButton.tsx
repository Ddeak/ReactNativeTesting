import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { theme } from "../../styles";

interface IProps {
    onPress: () => void;
    text: string;
    icon: string;
    accessibilityLabel?: string;
    disabled?: boolean;
    style?: object;
}

export const HomeButton = (props: IProps) => {
    const { accessibilityLabel, text, onPress, icon } = props;

    const onButtonPress = () => {
        if (onPress) onPress();
    };

    return (
        <TouchableOpacity
            style={[styles.button, props.style]}
            disabled={props.disabled || false}
            onPress={onButtonPress}
            accessibilityLabel={accessibilityLabel || "Not Set"}
        >
            <Avatar.Icon icon={icon} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 110,
        height: 110,
        backgroundColor: theme.PRIMARY_COLOR,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        borderRadius: 5,
    },
    text: {
        color: theme.SECONDARY_COLOR,
    },
});
