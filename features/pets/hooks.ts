import { useState, useEffect } from "react";
import { Results } from "realm";

import { IPet } from "../../types";
import { PetService } from "../../db";

export const usePets = (refresh: boolean) => {
    const [pets, setPets] = useState<Results<IPet> | never[]>([]);

    useEffect(() => {
        const fetchCustomers = () => {
            const data = PetService.findAll();
            setPets(data);
        };

        fetchCustomers();
    }, [refresh]);

    return pets;
};
