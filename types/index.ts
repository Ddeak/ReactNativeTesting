export interface ICustomer {
    id?: string;
    firstName: string;
    surname: string;
    phoneNumber: string;
    image?: string;
    notes: string;
    pets?: IPet[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPet {
    id?: string;
    name: string;
    breed: string;
    owner: ICustomer;
    notes: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum AppointmentStatus {
    Normal = "NORMAL",
    Canceled = "CANCELED",
    Late = "LATE",
    NOSHOW = "NOSHOW",
}

export interface IAppointment {
    id?: string;
    date: Date;
    customer: ICustomer;
    status: AppointmentStatus;
    duration: number;
    createdAt?: Date;
    updatedAt?: Date;
}
