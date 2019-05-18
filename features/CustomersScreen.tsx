import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../styles";

import { SearchBar } from "./SearchBar";

interface Props {}

export const CustomerScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <Text>Customers Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.SCREEN_BACKGROUND
  }
});
