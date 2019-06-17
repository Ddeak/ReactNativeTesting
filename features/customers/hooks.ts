import { useEffect, useState, useReducer } from "react";
import { Results } from "realm";

import { ICustomer, IAppointment } from "../../types";
import { reducer, Actions, initialReducerState } from "./reducer";
import { CustomerService } from "../../db";
import { CustomerAppointments } from "./CustomerAppointments";

export const useCustomers = (refresh: boolean, filter?: string) => {
    const [customers, setCustomers] = useState<Results<ICustomer> | never[]>(
        []
    );

    useEffect(() => {
        const fetchCustomers = () => {
            const data = filter
                ? CustomerService.findFiltered(filter)
                : CustomerService.findAll();
            setCustomers(data);
        };

        fetchCustomers();
    }, [refresh, filter]);

    return customers;
};

export const useCustomer = (id: string) => {
    const [state, dispatch] = useReducer(reducer, initialReducerState);

    if (!id) return [state, dispatch];

    useEffect(() => {
        const fetchCustomer = () => {
            dispatch(Actions.setLoading(true));
            const data = CustomerService.findById(id);

            if (data) dispatch(Actions.setState({ ...data, loading: false }));
            else dispatch(Actions.setLoading(false));
        };

        fetchCustomer();
    }, []);

    return [state, dispatch];
};

export const useCustomerAppointments = (id: string, refresh: boolean) => {
    const [customerAppointments, setAppointments] = useState<
        Results<IAppointment> | never[]
    >([]);

    if (!id) return customerAppointments;

    useEffect(() => {
        const fetchCustomers = () => {
            const data = CustomerService.findByCustomer(id);
            setAppointments(data);
        };

        fetchCustomers();
    }, [refresh]);

    return customerAppointments;
};
