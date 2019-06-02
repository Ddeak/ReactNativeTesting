import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Title, IconButton, FAB } from "react-native-paper";
import moment from "moment";

import { theme } from "../../styles";

interface IPropsType {
    date: Date;
    toggleDate: (days: number) => void;
}

const getDateText = (date: Date): string => {
    const momentDate = moment(date);
    if (momentDate.isSame(moment(new Date()), "date")) return "Today";

    const tomorrow = moment(new Date()).add(1, "days");
    if (momentDate.isSame(tomorrow, "date")) return "Tomorrow";

    const yesterday = moment(new Date()).add(-1, "days");
    if (momentDate.isSame(yesterday, "date")) return "Yesterday";

    return momentDate.format("DD/MM/YY");
};

export const ListHeader = ({ date, toggleDate }: IPropsType) => {
    const dateText = getDateText(date);

    return (
        <View style={styles.container}>
            <FAB small icon="arrow-back" onPress={() => toggleDate(-1)} />
            <Title style={styles.titleText}>{dateText}</Title>
            <FAB small icon="arrow-forward" onPress={() => toggleDate(1)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
    },
    titleText: {
        color: theme.SECONDARY_COLOR,
    },
});
