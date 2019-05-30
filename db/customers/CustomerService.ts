import Realm, { Results } from "realm";
import { schema } from "../schema";
import { ICustomer } from "../../types";
import { CustomerModel } from "./model";

const realm = new Realm({
    schema: schema,
});

export const CustomerService = {
    findAll: (): Results<ICustomer> => {
        return realm.objects("Customer");
    },

    findById: (id: string): ICustomer | undefined => {
        return realm.objectForPrimaryKey("Customer", id);
    },

    save: function(customer: ICustomer) {
        realm.write(() => {
            customer.updatedAt = new Date();
            realm.create("Customer", new CustomerModel(customer));
        });
    },

    update: function(customer: ICustomer, callback: () => void) {
        if (!callback) return;
        realm.write(() => {
            callback();
            customer.updatedAt = new Date();
        });
    },

    delete: (id: string) => {
        realm.write(() => {
            return realm.delete(realm.objectForPrimaryKey("Customer", id));
        });
    },
};
