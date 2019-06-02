import { createStackNavigator } from "react-navigation";

import { AppointmentList } from "./AppointmentList";
import { Appointment } from "./Appointment";
import { NavigationHeader } from "../ui/NavigationHeader";

export const AppointmentStack = createStackNavigator(
    {
        Appointments: AppointmentList,
        Appointment: Appointment,
    },
    {
        defaultNavigationOptions: {
            header: NavigationHeader,
        },
    }
);
