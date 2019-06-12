import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { NavigationScreenProp, NavigationEvents } from "react-navigation";
import { FAB, Text } from "react-native-paper";

import { theme } from "../../styles";

import { SearchBar } from "../ui/SearchBar";
import { ICustomer } from "../../types";
import { useCustomers } from "./hooks";

interface IListProps {
    navigation: NavigationScreenProp<any, any>;
}

interface IRowProps {
    item: ICustomer;
}

const renderCustomerRow = (
    { item }: IRowProps,
    onPress: (id: string | ICustomer | undefined) => void
) => {
    return (
        <TouchableOpacity style={styles.row} onPress={() => onPress(item)}>
            <Text>
                {item.firstName} {item.surname}
            </Text>
        </TouchableOpacity>
    );
};

export const CustomersList = ({ navigation }: IListProps) => {
    const [refresh, setRefresh] = useState(true);
    const [filter, setFilter] = useState("");
    const customers = useCustomers(refresh, filter);
    const onRowPress = navigation.getParam("onRowPress");

    const onSearchChange = (text: string) => {
        setFilter(text);
    };

    const defaultRowPress = (customer?: ICustomer) => {
        const id = customer ? customer.id : null;
        navigation.push("CustomerProfile", { id });
    };

    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={() => setRefresh(!refresh)} />
            <SearchBar onSearchChange={onSearchChange} />
            <FlatList
                data={customers}
                renderItem={item =>
                    renderCustomerRow(item, onRowPress || defaultRowPress)
                }
                keyExtractor={(_item, index) => `${index}`}
            />
            {!onRowPress && (
                <FAB
                    style={styles.fab}
                    icon="add"
                    onPress={() => defaultRowPress()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.SCREEN_BACKGROUND,
    },
    row: {
        flex: 1,
        height: 35,
        width: 250,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.SECONDARY_COLOR,
        borderRadius: 5,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
