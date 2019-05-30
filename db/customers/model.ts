import uuid from "react-native-uuid";
import { ICustomer } from "../../types";

export class CustomerModel {
    id: string;
    firstName: string = "";
    surname: string = "";
    phoneNumber: string = "";
    updatedAt: Date;
    createdAt: Date;

    constructor({ firstName, surname, phoneNumber }: ICustomer) {
        this.id = uuid.v4();
        this.firstName = firstName;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
