import { useEffect, useState, useReducer } from "react";
import { Results } from "realm";

import { ICustomer } from "../../types";
import { reducer, Actions, initialReducerState } from "./reducer";
import { CustomerService } from "../../db";

export const useCustomers = (refresh: boolean) => {
    const [customers, setCustomers] = useState<Results<ICustomer> | never[]>(
        []
    );

    useEffect(() => {
        const fetchCustomers = () => {
            const data = CustomerService.findAll();
            setCustomers(data);
        };

        fetchCustomers();
    }, [refresh]);

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
