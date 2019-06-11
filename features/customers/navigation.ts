import { createStackNavigator } from "react-navigation";

import { CustomersList } from "./CustomersList";
import { CustomerProfile } from "./CustomerProfile";
import { NavigationHeader } from "../ui/NavigationHeader";

export const CustomerStack = createStackNavigator(
    {
        Customers: CustomersList,
        CustomerProfile: CustomerProfile,
    },
    {
        defaultNavigationOptions: {
            header: NavigationHeader,
        },
    }
);
