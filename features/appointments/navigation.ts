import { createStackNavigator } from "react-navigation";

import { AppointmentList } from "./AppointmentList";
import { Appointment } from "./Appointment";
import { CustomersList } from "../customers";
import { NavigationHeader } from "../ui/NavigationHeader";

export const AppointmentStack = createStackNavigator(
    {
        Appointments: AppointmentList,
        Appointment: Appointment,
        CustomerList: CustomersList,
    },
    {
        defaultNavigationOptions: {
            header: NavigationHeader,
        },
    }
);
