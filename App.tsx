/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-native-paper";

import { HomeScreen, CustomersList, CustomerProfile } from "./features";
import { materialTheme } from "./styles";

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Customers: CustomersList,
        CustomerProfile: CustomerProfile,
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
