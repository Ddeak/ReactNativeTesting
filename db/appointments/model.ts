import uuid from "react-native-uuid";
import { ICustomer } from "../../types";

interface IModelType {
    id?: string;
    customer: ICustomer;
    date: Date;
    duration: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class AppointmentModel {
    id: string;
    customer: ICustomer;
    date: Date;
    duration: number = 0;
    updatedAt: Date;
    createdAt: Date;

    constructor({
        id,
        customer,
        date,
        duration,
        createdAt,
        updatedAt,
    }: IModelType) {
        this.id = id || uuid.v4();
        this.customer = customer;
        this.date = date;
        this.duration = duration;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
