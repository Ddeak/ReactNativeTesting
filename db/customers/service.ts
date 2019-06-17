import Realm, { Results } from "realm";
import { schema } from "../schema";
import { ICustomer, IPet, IAppointment } from "../../types";
import { CustomerModel } from "./model";

const MAX_CUSTOMERS = 20;
const MAX_CUSTOMER_APPOINTMENTS = 20;

const realm = new Realm({
    schema: schema,
});

export const CustomerService = {
    findAll: (): Results<ICustomer> => {
        // @ts-ignore
        return realm.objects("Customer").slice(0, MAX_CUSTOMERS);
    },

    findFiltered: (filter: string): Results<ICustomer> => {
        const filterString = `firstName CONTAINS[c] "${filter}" OR surname CONTAINS[c] "${filter}" OR phoneNumber CONTAINS "${filter}"`;
        // @ts-ignore
        return realm
            .objects("Customer")
            .filtered(filterString)
            .slice(0, MAX_CUSTOMERS);
    },

    findById: (id: string): ICustomer | undefined => {
        return realm.objectForPrimaryKey("Customer", id);
    },

    findByCustomer: (id: string): Results<IAppointment> => {
        // @ts-ignore
        return realm
            .objects("Appointment")
            .filtered(`customer.id = "${id}"`)
            .sorted("date")
            .slice(0, MAX_CUSTOMER_APPOINTMENTS);
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
            const customer: ICustomer | undefined = realm.objectForPrimaryKey(
                "Customer",
                id
            );

            if (customer) {
                realm.delete(customer.pets);

                const appointments = realm
                    .objects("Appointment")
                    .filtered(`customer.id = "${customer.id}"`);

                realm.delete(appointments);
            }
            return realm.delete(customer);
        });
    },
};
