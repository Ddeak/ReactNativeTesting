import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";

interface PropTypes {
    navigation: NavigationScreenProp<any, any>;
}

export const NavigationHeader = ({ navigation }: PropTypes) => {
    const index = navigation.state.index;
    return (
        <Appbar style={styles.appBar}>
            {index === 0 ? (
                <Appbar.Action
                    icon="menu"
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                />
            ) : (
                <Appbar.BackAction
                    onPress={() => {
                        navigation.pop();
                    }}
                />
            )}
        </Appbar>
    );
};

const styles = StyleSheet.create({
    appBar: {
        height: "100%",
        paddingTop: 30,
    },
});
