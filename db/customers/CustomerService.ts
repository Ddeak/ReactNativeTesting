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
        const isUpdate = customer.id ? true : false;
        const c = isUpdate ? customer : new CustomerModel(customer);

        realm.write(() => {
            c.updatedAt = new Date();
            realm.create("Customer", c, isUpdate);
        });
    },

    delete: (id: string) => {
        realm.write(() => {
            return realm.delete(realm.objectForPrimaryKey("Customer", id));
        });
    },
};
