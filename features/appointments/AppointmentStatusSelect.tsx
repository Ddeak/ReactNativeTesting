import React from "react";
import { View, GestureResponderEvent, StyleSheet } from "react-native";
import { ToggleButton } from "react-native-paper";

import { AppointmentStatus } from "../../types";
import { theme } from "../../styles";

interface IPropsType {
    activeStatus: AppointmentStatus;
    onPress: (status: AppointmentStatus) => void;
}

const mapStatus = (status: string): AppointmentStatus => {
    switch (status) {
        case AppointmentStatus.Late:
            return AppointmentStatus.Late;
        case AppointmentStatus.Canceled:
            return AppointmentStatus.Canceled;
        case AppointmentStatus.NOSHOW:
            return AppointmentStatus.NOSHOW;
        default:
            return AppointmentStatus.Normal;
    }
};

export const AppointmentStatusSelect = (props: IPropsType) => {
    const { onPress, activeStatus } = props;

    return (
        <View style={styles.container}>
            <ToggleButton.Group
                onValueChange={value => onPress(mapStatus(value))}
                value={activeStatus}
            >
                <ToggleButton
                    icon="cancel"
                    value={AppointmentStatus.Canceled}
                    color={theme.SECONDARY_COLOR}
                    style={[
                        styles.button,
                        activeStatus === AppointmentStatus.Canceled
                            ? styles.canceled
                            : {},
                    ]}
                />
                <ToggleButton
                    icon="timer-off"
                    value={AppointmentStatus.Late}
                    color={theme.SECONDARY_COLOR}
                    style={[
                        styles.button,
                        activeStatus === AppointmentStatus.Late
                            ? styles.late
                            : {},
                    ]}
                />
                <ToggleButton
                    icon="speaker-notes-off"
                    value={AppointmentStatus.NOSHOW}
                    color={theme.SECONDARY_COLOR}
                    style={[
                        styles.button,
                        activeStatus === AppointmentStatus.NOSHOW
                            ? styles.noShow
                            : {},
                    ]}
                />
            </ToggleButton.Group>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
    },
    button: {
        width: "33%",
    },
    canceled: {
        backgroundColor: theme.DELETE_COLOR,
    },
    late: {
        backgroundColor: theme.LATE_APPT_COLOR,
    },
    noShow: {
        backgroundColor: theme.NO_SHOW_APPT_COLOR,
    },
});
