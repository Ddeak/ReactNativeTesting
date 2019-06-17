import { DefaultTheme } from "react-native-paper";

export const theme = {
    FONT_SIZE_SMALL: 12,
    FONT_SIZE_MEDIUM: 14,
    FONT_SIZE_LARGE: 16,
    PRIMARY_COLOR: "rgb(100, 10, 181)",
    SECONDARY_COLOR: "rgb(252, 249, 255)",
    DELETE_COLOR: "rgb(237, 56, 132)",
    SCREEN_BACKGROUND: "rgb(56, 56, 56)",
    ACCENT_COLOR: "rgb(3, 218, 196)",
    LATE_APPT_COLOR: "rgb(66, 134, 244)",
    NO_SHOW_APPT_COLOR: "rgb(244, 235, 65)",
};

export const materialTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: theme.PRIMARY_COLOR,
        secondary: theme.SECONDARY_COLOR,
        accent: theme.ACCENT_COLOR,
    },
};
