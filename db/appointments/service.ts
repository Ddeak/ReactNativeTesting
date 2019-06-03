import Realm, { Results } from "realm";
import { schema } from "../schema";
import { IAppointment } from "../../types";
import { AppointmentModel } from "./model";

const realm = new Realm({
    schema: schema,
});

export const AppointmentService = {
    findAll: () => {
        return realm.objects("Appointment");
    },

    findById: (id: string): IAppointment | undefined => {
        return realm.objectForPrimaryKey("Appointment", id);
    },

    save: function(appointment: IAppointment) {
        const isUpdate = appointment.id ? true : false;
        const a = isUpdate ? appointment : new AppointmentModel(appointment);

        realm.write(() => {
            a.updatedAt = new Date();
            realm.create("Appointment", a, isUpdate);
        });
    },

    delete: (id: string) => {
        realm.write(() => {
            return realm.delete(realm.objectForPrimaryKey("Appointment", id));
        });
    },
};
