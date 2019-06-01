import { useState, useEffect } from "react";
import { Results } from "realm";

import { IPet } from "../../types";
import { PetService } from "../../db";

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
