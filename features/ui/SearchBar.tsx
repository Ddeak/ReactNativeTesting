import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

interface IProps {
    onSearchChange?: (text: string) => void;
}

export const SearchBar = (props: IProps) => {
    const [searchValue, setValue] = useState("");

    const onChange = (text: string) => {
        setValue(text);
        if (props.onSearchChange) props.onSearchChange(text);
    };

    return (
        <Searchbar
            style={{ margin: 10 }}
            placeholder="Search"
            onChangeText={onChange}
            value={searchValue}
        />
    );
};
