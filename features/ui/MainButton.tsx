import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface IProps {
    onPress: () => void;
    text: string;
    accessibilityLabel?: string;
    disabled?: boolean;
    style?: object;
    icon?: string;
}

export const MainButton = (props: IProps) => {
    const { accessibilityLabel, text, onPress } = props;

    const onButtonPress = () => {
        if (onPress) onPress();
    };

    return (
        <Button
            icon={props.icon}
            mode="contained"
            style={[styles.button, props.style]}
            disabled={props.disabled || false}
            onPress={onButtonPress}
            accessibilityLabel={accessibilityLabel || "Not Set"}
        >
            {text}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 150,
        margin: 20,
    },
});
