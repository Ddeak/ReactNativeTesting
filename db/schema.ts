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
        createdAt: "date",
        updatedAt: "date",
    },
};

export const schema = [CustomerSchema, PetSchema];
