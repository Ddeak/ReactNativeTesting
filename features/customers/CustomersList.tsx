import React, { useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
} from "react-native";
import { withNavigation, NavigationScreenProp } from "react-navigation";
import { FAB } from "react-native-paper";

import { theme } from "../../styles";

import { SearchBar } from "../ui/SearchBar";
import { ICustomer } from "../../types";
import { useCustomers } from "./hooks";

interface IListProps {
    customers: ICustomer[];
    navigation: NavigationScreenProp<any, any>;
}

interface IRowProps {
    item: ICustomer;
}

const renderCustomerRow = (
    { item }: IRowProps,
    onPress: (id: string | undefined) => void
) => {
    return (
        <TouchableOpacity style={styles.row} onPress={() => onPress(item.id)}>
            <Text>
                {item.firstName} {item.surname}
            </Text>
        </TouchableOpacity>
    );
};

export const CustomersList = withNavigation(({ navigation }: IListProps) => {
    const [refresh, setRefresh] = useState(true);
    const customers = useCustomers(refresh);

    const onDone = () => {
        setRefresh(!refresh);
    };

    const onRowPress = (id?: string) => {
        navigation.push("CustomerProfile", { id, onDone });
    };

    return (
        <View style={styles.container}>
            <SearchBar />
            <FlatList
                data={customers}
                renderItem={item => renderCustomerRow(item, onRowPress)}
                keyExtractor={(_item, index) => `${index}`}
            />
            <FAB style={styles.fab} icon="add" onPress={() => onRowPress()} />
        </View>
    );
});

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
        height: 30,
        width: 250,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.SECONDARY_COLOR,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
