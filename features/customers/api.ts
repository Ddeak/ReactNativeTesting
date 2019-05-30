import { ICustomer } from "../../types";
import { CustomerService } from "../../db";

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
    id,
    firstName,
    surname,
    phoneNumber,
}: ICustomer) => {
    try {
        const response = await fetch(`http://localhost:3001/customers/${id}`, {
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

export const deleteCustomer = (id: string) => {
    try {
        return CustomerService.delete(id);
    } catch (err) {
        console.log("Error: Failed to delete Customer: ", err);
    }
};
