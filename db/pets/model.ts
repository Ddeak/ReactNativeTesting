import uuid from "react-native-uuid";
import { IPet, ICustomer } from "../../types";

export class PetModel {
    id: string;
    name: string = "";
    breed: string = "";
    notes: string = "";
    owner: ICustomer;
    updatedAt: Date;
    createdAt: Date;

    constructor({ id, name, breed, owner, notes, createdAt, updatedAt }: IPet) {
        this.id = id || uuid.v4();
        this.name = name;
        this.breed = breed;
        this.owner = owner;
        this.notes = notes;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
