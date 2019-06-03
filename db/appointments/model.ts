import uuid from "react-native-uuid";
import { ICustomer } from "../../types";
import { createDrawerNavigator } from "react-navigation";

interface IModelType {
    id?: string;
    customer: ICustomer;
    startTime: string;
    date: Date;
    duration: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class AppointmentModel {
    id: string;
    customer: ICustomer;
    startTime: string = "";
    date: Date;
    duration: number = 0;
    updatedAt: Date;
    createdAt: Date;

    constructor({
        id,
        customer,
        date,
        startTime,
        duration,
        createdAt,
        updatedAt,
    }: IModelType) {
        this.id = id || uuid.v4();
        this.customer = customer;
        this.startTime = startTime;
        this.date = date;
        this.duration = duration;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
