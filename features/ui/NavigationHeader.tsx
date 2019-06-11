import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";

interface IPropTypes {
    navigation: NavigationScreenProp<any, any>;
}

export const NavigationHeader = ({ navigation }: IPropTypes) => {
    const { index, routeName } = navigation.state;

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
            <Appbar.Content title={routeName} />
        </Appbar>
    );
};

const styles = StyleSheet.create({
    appBar: {
        height: "100%",
        paddingTop: 30,
    },
});
