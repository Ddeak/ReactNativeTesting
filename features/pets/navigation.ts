import { createStackNavigator } from "react-navigation";

import { PetList } from "./PetList";
import { PetProfile } from "./PetProfile";
import { CustomersList } from "../customers";
import { NavigationHeader } from "../ui/NavigationHeader";

export const PetStack = createStackNavigator(
    {
        Pets: PetList,
        PetProfile: PetProfile,
        CustomerList: CustomersList,
    },
    {
        defaultNavigationOptions: {
            header: NavigationHeader,
        },
    }
);
