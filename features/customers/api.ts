import { ICustomer } from "./types";

export const getCustomers = async () => {
    try {
        const response = await fetch("http://localhost:3001/customers");
        return await response.json();
    } catch (err) {
        console.log("Error: Failed to get customers: ", err);
    }
};

export const createCustomer = async ({
    firstName,
    surname,
    phoneNumber,
}: ICustomer) => {
    try {
        const response = await fetch("http://localhost:3001/customers/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                surname,
                phoneNumber,
            }),
        });
        return await response.json();
    } catch (err) {
        console.log("Error: Failed to create Customer: ", err);
    }
};

export const editCustomer = async ({
    _id,
    firstName,
    surname,
    phoneNumber,
}: ICustomer) => {
    try {
        const response = await fetch(`http://localhost:3001/customers/${_id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                surname,
                phoneNumber,
            }),
        });
        return await response.json();
    } catch (err) {
        console.log("Error: Failed to edit Customer: ", err);
    }
};

export const getCustomerById = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3001/customers/${id}`);
        return await response.json();
    } catch (err) {
        console.log("Error: Failed to get customer: ", err);
    }
};

export const deleteCustomer = async (_id: string) => {
    try {
        const response = await fetch(
            `http://localhost:3001/customers/edit/${_id}`,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        return await response.json();
    } catch (err) {
        console.log("Error: Failed to delete Customer: ", err);
    }
};
