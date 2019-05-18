import React from "react";
import { View, StyleSheet, Button } from "react-native";

import { theme } from "../../styles";

interface Props {
  onPress: () => void;
  text: string;
  accessibilityLabel?: string;
}

export const MainButton = (props: Props) => {
  const { accessibilityLabel, text, onPress } = props;

  const onButtonPress = () => {
    if (onPress) onPress();
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={onButtonPress}
        title={text}
        color={theme.SECONDARY_COLOR}
        accessibilityLabel={accessibilityLabel || "Not Set"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    margin: 20,
    backgroundColor: theme.PRIMARY_COLOR
  }
});
