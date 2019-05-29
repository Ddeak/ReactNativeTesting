import React, { useEffect, useState, useReducer } from "react";

import { getCustomers, getCustomerById } from "./api";
import { ICustomer } from "./types";
import { reducer, Actions, initialReducerState } from "./reducer";

export const useCustomers = (refresh: boolean): ICustomer[] => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await getCustomers();
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
        const fetchCustomer = async () => {
            dispatch(Actions.setLoading(true));
            const data = await getCustomerById(id);
            dispatch(Actions.setState({ ...data, loading: false }));
        };

        fetchCustomer();
    }, []);

    return [state, dispatch];
};
