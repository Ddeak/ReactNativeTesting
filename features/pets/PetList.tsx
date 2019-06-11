import React, { useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { FAB, Avatar } from "react-native-paper";

import { theme } from "../../styles";

import { SearchBar } from "../ui/SearchBar";
import { IPet } from "../../types";
import { usePets } from "./hooks";

interface IListProps {
    navigation: NavigationScreenProp<any, any>;
}

interface IRowProps {
    item: IPet;
}

const renderPetRow = (
    { item }: IRowProps,
    onPress: (id: string | undefined) => void
) => {
    return (
        <TouchableOpacity style={styles.row} onPress={() => onPress(item.id)}>
            <Avatar.Text size={24} label={item.name} />
            <Text style={{ marginLeft: 10 }}>{item.name}</Text>
        </TouchableOpacity>
    );
};

export const PetList = ({ navigation }: IListProps) => {
    const [refresh, setRefresh] = useState(true);
    const [filter, setFilter] = useState("");
    const pets = usePets(refresh, filter);

    const onSearchChange = (text: string) => {
        setFilter(text);
    };

    const onDone = () => {
        setRefresh(!refresh);
    };

    const onRowPress = (id?: string) => {
        navigation.push("PetProfile", { id, onDone });
    };

    return (
        <View style={styles.container}>
            <SearchBar onSearchChange={onSearchChange} />
            <FlatList
                data={pets}
                renderItem={item => renderPetRow(item, onRowPress)}
                keyExtractor={(_item, index) => `${index}`}
            />
            <FAB style={styles.fab} icon="add" onPress={() => onRowPress()} />
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
        minHeight: 35,
        width: 250,
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: theme.SECONDARY_COLOR,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
