import Realm, { Results } from "realm";
import { schema } from "../schema";
import { IPet } from "../../types";
import { PetModel } from "./model";

const realm = new Realm({
    schema: schema,
});

export const PetService = {
    findAll: (): Results<IPet> => {
        return realm.objects("Pet");
    },

    findFiltered: (filter: string): Results<IPet> => {
        const filterString = `name CONTAINS[c] "${filter}" OR breed CONTAINS[c] "${filter}"`;
        // @ts-ignore
        return realm.objects("Pet").filtered(filterString);
    },

    findById: (id: string): IPet | undefined => {
        return realm.objectForPrimaryKey("Pet", id);
    },

    save: function(pet: IPet) {
        const isUpdate = pet.id ? true : false;
        const p = isUpdate ? pet : new PetModel(pet);

        realm.write(() => {
            p.updatedAt = new Date();
            realm.create("Pet", p, isUpdate);
        });
    },

    delete: (id: string) => {
        realm.write(() => {
            return realm.delete(realm.objectForPrimaryKey("Pet", id));
        });
    },
};
