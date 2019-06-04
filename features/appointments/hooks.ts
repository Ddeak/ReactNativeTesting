import { useReducer, useEffect, useState } from "react";
import { Results } from "realm";
import { reducer, Actions, initialReducerState } from "./reducer";
import { AppointmentService } from "../../db";
import { IAppointment } from "../../types";

export const useAppointments = (refresh: boolean, date: Date) => {
    const [appointments, setAppointments] = useState<
        Results<IAppointment> | never[]
    >([]);

    useEffect(() => {
        const fetchCustomers = () => {
            const data = AppointmentService.findAll(date);
            setAppointments(data);
        };

        fetchCustomers();
    }, [refresh]);

    return appointments;
};

export const useAppointment = (id: string) => {
    const [state, dispatch] = useReducer(reducer, initialReducerState);

    if (!id) return [state, dispatch];

    useEffect(() => {
        const fetchCustomer = () => {
            dispatch(Actions.setLoading(true));
            const data = AppointmentService.findById(id);

            if (data) {
                dispatch(Actions.setState({ ...data, loading: false }));
            } else dispatch(Actions.setLoading(false));
        };

        fetchCustomer();
    }, []);

    return [state, dispatch];
};
