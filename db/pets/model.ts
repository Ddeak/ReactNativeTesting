import uuid from "react-native-uuid";
import { IPet, ICustomer } from "../../types";

export class CustomerModel {
    id: string;
    name: string = "";
    breed: string = "";
    owner: ICustomer;
    updatedAt: Date;
    createdAt: Date;

    constructor({ name, breed, owner }: IPet) {
        this.id = uuid.v4();
        this.name = name;
        this.breed = breed;
        this.owner = owner;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
