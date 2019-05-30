export interface ICustomer {
    id?: string;
    firstName: string;
    surname: string;
    phoneNumber: string;
    pets?: IPet[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPet {
    id?: string;
    name: string;
    breed: string;
    owner: ICustomer;
}
