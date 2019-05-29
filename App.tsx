/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-native-paper";

import { HomeScreen, CustomerStack } from "./features";
import { materialTheme } from "./styles";

const AppNavigator = createDrawerNavigator(
    {
        Home: HomeScreen,
        Customers: CustomerStack,
    },
    {
        initialRouteName: "Home",
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return (
            <Provider theme={materialTheme}>
                <AppContainer />
            </Provider>
        );
    }
}
