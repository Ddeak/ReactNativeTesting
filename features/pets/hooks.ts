import { useState, useEffect, useReducer } from "react";
import { Results } from "realm";

import { IPet } from "../../types";
import { PetService, CustomerService } from "../../db";
import { reducer, Actions, initialReducerState } from "./reducer";

export const usePets = (refresh: boolean, filter: string) => {
    const [pets, setPets] = useState<Results<IPet> | never[]>([]);

    useEffect(() => {
        const fetchCustomers = () => {
            const data = filter
                ? PetService.findFiltered(filter)
                : PetService.findAll();
            setPets(data);
        };

        fetchCustomers();
    }, [refresh, filter]);

    return pets;
};

export const usePet = (id: string) => {
    const [state, dispatch] = useReducer(reducer, initialReducerState);

    if (!id) return [state, dispatch];

    useEffect(() => {
        const fetchCustomer = () => {
            dispatch(Actions.setLoading(true));
            const data = PetService.findById(id);

            if (data) {
                dispatch(Actions.setState({ ...data, loading: false }));
            } else dispatch(Actions.setLoading(false));
        };

        fetchCustomer();
    }, []);

    return [state, dispatch];
};
