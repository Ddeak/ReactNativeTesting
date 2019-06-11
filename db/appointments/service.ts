import Realm, { Results } from "realm";
import { schema } from "../schema";
import { IAppointment } from "../../types";
import { AppointmentModel } from "./model";

const MAX_APPOINTMENTS = 10;

const realm = new Realm({
    schema: schema,
});

export const AppointmentService = {
    findAll: (date: Date): Results<IAppointment> => {
        let currentDay = new Date(date);
        currentDay.setHours(0, 0, 0, 0);
        let nextDay = new Date(date);
        nextDay.setHours(24, 0, 0, 0);

        const dates = realm
            .objects("Appointment")
            .filtered("date >= $0 AND date <= $1", currentDay, nextDay);
        // @ts-ignore
        return dates.sorted("date").slice(0, MAX_APPOINTMENTS);
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
