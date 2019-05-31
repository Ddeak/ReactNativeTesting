import { createStackNavigator } from "react-navigation";

import { PetList } from "./PetList";
import { PetProfile } from "./PetProfile";
import { NavigationHeader } from "../ui/NavigationHeader";

export const PetStack = createStackNavigator(
    {
        Pets: {
            screen: PetList,
            navigationOptions: { title: "Hello" },
        },
        PetProfile: { screen: PetProfile },
    },
    {
        defaultNavigationOptions: {
            header: NavigationHeader,
        },
    }
);
