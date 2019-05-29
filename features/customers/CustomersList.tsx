import React from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
} from "react-native";
import { withNavigation, NavigationScreenProp } from "react-navigation";

import { theme } from "../../styles";

import { SearchBar } from "../ui/SearchBar";
import { Customer } from "./types";
import { useCustomers } from "./hooks";

interface ListProps {
    customers: Array<Customer>;
    navigation: NavigationScreenProp<any, any>;
}

interface RowProps {
    item: Customer;
}

const renderCustomerRow = ({ item }: RowProps, onPress: Function) => {
    return (
        <TouchableOpacity style={styles.row} onPress={() => onPress(item._id)}>
            <Text>
                {item.firstName} {item.surname}
            </Text>
        </TouchableOpacity>
    );
};

export const CustomersList = withNavigation(({ navigation }: ListProps) => {
    const customers = useCustomers();
    const onRowPress = (id: string) => {
        navigation.push("CustomerProfile", { id });
    };

    return (
        <View style={styles.container}>
            <SearchBar />
            <FlatList
                data={customers}
                renderItem={item => renderCustomerRow(item, onRowPress)}
                keyExtractor={(_item, index) => `${index}`}
            />
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
});
