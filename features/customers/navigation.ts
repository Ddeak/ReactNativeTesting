import { createStackNavigator } from "react-navigation";

import { CustomersList } from "./CustomersList";
import { CustomerProfile } from "./CustomerProfile";
import { NavigationHeader } from "../ui/NavigationHeader";

export const CustomerStack = createStackNavigator(
    {
        Customers: {
            screen: CustomersList,
            navigationOptions: { title: "Hello" },
        },
        CustomerProfile: { screen: CustomerProfile },
    },
    {
        defaultNavigationOptions: {
            header: NavigationHeader,
        },
    }
);
