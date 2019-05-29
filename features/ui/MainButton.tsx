import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { theme } from "../../styles";

interface Props {
    onPress: () => void;
    text: string;
    accessibilityLabel?: string;
    disabled?: boolean;
}

export const MainButton = (props: Props) => {
    const { accessibilityLabel, text, onPress } = props;

    const onButtonPress = () => {
        if (onPress) onPress();
    };

    return (
        <Button
            mode="contained"
            style={styles.button}
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
        width: 300,
        margin: 20,
    },
});
