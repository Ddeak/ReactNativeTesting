import React, { useEffect, useState } from "react";

import { getCustomers, getCustomerById } from "./api";
import { Customer } from "./types";

export const useCustomers = (): Array<Customer> => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await getCustomers();
            setCustomers(data);
        };

        fetchCustomers();
    }, []);

    return customers;
};

export const useCustomer = (id: string): Customer | undefined => {
    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        const fetchCustomer = async () => {
            const data = await getCustomerById(id);
            setCustomer(data);
        };

        fetchCustomer();
    }, []);

    return customer;
};
