import { createStackNavigator } from "react-navigation";

import { PetList } from "./PetList";
import { PetProfile } from "./PetProfile";
import { CustomersList } from "../customers";
import { NavigationHeader } from "../ui/NavigationHeader";

export const PetStack = createStackNavigator(
    {
        Pets: { screen: PetList },
        PetProfile: { screen: PetProfile },
        CustomerList: CustomersList,
    },
    {
        defaultNavigationOptions: {
            header: NavigationHeader,
        },
    }
);
