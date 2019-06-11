import Realm, { Results } from "realm";
import { schema } from "../schema";
import { IPet, ICustomer } from "../../types";
import { PetModel } from "./model";

const MAX_PETS = 10;

const realm = new Realm({
    schema: schema,
});

export const PetService = {
    findAll: (): Results<IPet> => {
        // @ts-ignore
        return realm.objects("Pet").slice(0, MAX_PETS);
    },

    findFiltered: (filter: string): Results<IPet> => {
        const filterString = `name CONTAINS[c] "${filter}" OR breed CONTAINS[c] "${filter}"`;
        // @ts-ignore
        return realm
            .objects("Pet")
            .filtered(filterString)
            .slice(0, MAX_PETS);
    },

    findById: (id: string): IPet | undefined => {
        const pet = realm.objectForPrimaryKey("Pet", id);
        // @ts-ignore
        return { ...pet, owner: pet.owner[0] };
    },

    save: function(pet: IPet) {
        const isUpdate = pet.id ? true : false;
        const p = new PetModel(pet);
        const owner: ICustomer | undefined = realm.objectForPrimaryKey(
            "Customer",
            `${p.owner.id}`
        );

        if (!owner) return;

        realm.write(() => {
            p.updatedAt = new Date();
            if (isUpdate) realm.delete(realm.objectForPrimaryKey("Pet", p.id));
            if (owner.pets) owner.pets.push(p);
        });
    },

    delete: (id: string) => {
        realm.write(() => {
            return realm.delete(realm.objectForPrimaryKey("Pet", id));
        });
    },
};
