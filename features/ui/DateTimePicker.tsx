import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, FAB, Title, TextInput } from "react-native-paper";
import moment from "moment";

import DateTimePicker from "react-native-modal-datetime-picker";

import { theme } from "../../styles";

interface IPropsType {
    date: Date;
    handleDatePicked: (date: Date) => void;
    onCancel?: () => void;
}

const formatDate = (date: Date): string => {
    return moment(date).format("LLL");
};

export const DatePicker = (props: IPropsType) => {
    const [pickerVisible, setPickerVisible] = useState(false);
    const { handleDatePicked, onCancel, date } = props;

    const showPicker = () => {
        setPickerVisible(true);
    };

    const onDateSelected = (date: Date) => {
        if (handleDatePicked) handleDatePicked(date);
        setPickerVisible(false);
    };

    const onCancelClick = () => {
        if (onCancel) onCancel();
        setPickerVisible(false);
    };

    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    onFocus={showPicker}
                    style={{ flex: 1, marginHorizontal: 10 }}
                    editable={false}
                    label="Date"
                    value={formatDate(date)}
                />
                <FAB small icon="edit" onPress={showPicker} />
            </View>
            <DateTimePicker
                isVisible={pickerVisible}
                mode={"datetime"}
                onConfirm={onDateSelected}
                onCancel={onCancelClick}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        padding: 10,
        paddingRight: 20,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    text: {
        color: theme.SECONDARY_COLOR,
    },
});
