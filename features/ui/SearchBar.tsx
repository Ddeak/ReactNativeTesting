import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

import { theme } from "../../styles";

interface IProps {
    onSearchChange?: (text: string) => void;
    filterActive: boolean;
}

export const SearchBar = (props: IProps) => {
    const { onSearchChange, filterActive } = props;
    const [searchValue, setValue] = useState("");

    const onChange = (text: string) => {
        setValue(text);
        if (onSearchChange) onSearchChange(text);
    };

    const highlighted = filterActive
        ? { borderColor: theme.ACCENT_COLOR }
        : { borderColor: theme.SCREEN_BACKGROUND };

    return (
        <Searchbar
            style={[{ margin: 10, borderWidth: 4 }, highlighted]}
            placeholder="Search"
            onChangeText={onChange}
            value={searchValue}
        />
    );
};
