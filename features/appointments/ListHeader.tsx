import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Title, FAB, TouchableRipple } from "react-native-paper";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

import { theme } from "../../styles";

interface IPropsType {
    date: Date;
    toggleDate: (days: number | Date) => void;
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
    const [pickerVisible, setPickerVisible] = useState(false);
    const dateText = getDateText(date);

    const onDateSelected = (date: Date) => {
        toggleDate(date);
        setPickerVisible(false);
    };

    return (
        <View>
            <View style={styles.container}>
                <FAB small icon="arrow-back" onPress={() => toggleDate(-1)} />
                <TouchableRipple onPress={() => setPickerVisible(true)}>
                    <Title style={styles.titleText}>{dateText}</Title>
                </TouchableRipple>
                <FAB small icon="arrow-forward" onPress={() => toggleDate(1)} />
            </View>
            <DateTimePicker
                isVisible={pickerVisible}
                mode={"date"}
                onConfirm={onDateSelected}
                onCancel={() => setPickerVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
    },
    titleText: {
        color: theme.SECONDARY_COLOR,
    },
});
