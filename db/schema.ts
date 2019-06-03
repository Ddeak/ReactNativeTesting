const CustomerSchema = {
    name: "Customer",
    primaryKey: "id",
    properties: {
        id: { type: "string", indexed: true },
        firstName: "string",
        surname: "string",
        phoneNumber: "string",
        pets: "Pet[]",
        createdAt: "date",
        updatedAt: "date",
    },
};

const PetSchema = {
    name: "Pet",
    primaryKey: "id",
    properties: {
        id: { type: "string", indexed: true },
        name: "string",
        breed: "string",
        owner: {
            type: "linkingObjects",
            objectType: "Customer",
            property: "pets",
        },
        createdAt: "date",
        updatedAt: "date",
    },
};

const AppointmentSchema = {
    name: "Appointment",
    primaryKey: "id",
    properties: {
        id: { type: "string", indexed: true },
        customer: "Customer",
        date: "date",
        startTime: "string",
        duration: "int",
        createdAt: "date",
        updatedAt: "date",
    },
};

export const schema = [CustomerSchema, PetSchema, AppointmentSchema];
