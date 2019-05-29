import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

interface IProps {
    onSearchChange?: (text: string) => void;
}

export const SearchBar = (props: IProps) => {
    const [searchValue, setValue] = useState("");

    const onChange = (text: string) => {
        setValue(text);
        if (props.onSearchChange) props.onSearchChange(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={searchValue}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 35,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    input: {
        height: 30,
        borderColor: "gray",
        borderWidth: 1,
        width: "60%",
        padding: 5,
        borderRadius: 2,
    },
});
