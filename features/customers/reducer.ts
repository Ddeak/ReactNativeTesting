import { IPet } from "../../types";

export interface CustomerErrors {
    firstName?: string;
    surname?: string;
    phoneNumber?: string;
    hasErrors: boolean;
}

export interface IStateType {
    firstName: string;
    surname: string;
    phoneNumber: string;
    pets?: IPet[];
    notes?: string;
    image?: string;
    loading: boolean;
    errors?: CustomerErrors;
}

interface IActionType {
    type: string;
    payload: any;
}

interface IActionTypes {
    [key: string]: string;
}

export const initialReducerState = {
    firstName: "",
    surname: "",
    phoneNumber: "",
    pets: [],
    loading: false,
    errors: { hasErrors: false },
};

export const ActionTypes: IActionTypes = {
    UpdateFirstName: "@Customer/UpdateFirstName",
    UpdateSurname: "@Customer/UpdateSurname",
    UpdatePhoneNumber: "@Customer/UpdatePhoneNumber",
    UpdateImage: "@Customer/UpdateImage",
    UpdateNotes: "@Customer/UpdateNotes",
    UpdateErrors: "@Customer/UpdateErrors",
    UpdateLoading: "@Customer/UpdateLoading",
    SetState: "@Customer/SetState",
};

export const Actions = {
    setFirstName: (firstName: string) => ({
        type: ActionTypes.UpdateFirstName,
        payload: firstName,
    }),
    setSurname: (surname: string) => ({
        type: ActionTypes.UpdateSurname,
        payload: surname,
    }),
    setPhoneNumber: (phoneNumber: string) => ({
        type: ActionTypes.UpdatePhoneNumber,
        payload: phoneNumber,
    }),
    setImage: (image: string) => ({
        type: ActionTypes.UpdateImage,
        payload: image,
    }),
    setNotes: (notes: string) => ({
        type: ActionTypes.UpdateNotes,
        payload: notes,
    }),
    setLoading: (loading: boolean) => ({
        type: ActionTypes.UpdateLoading,
        payload: loading,
    }),
    setErrors: (errors: CustomerErrors) => ({
        type: ActionTypes.UpdateErrors,
        payload: errors,
    }),
    setState: (state: IStateType) => ({
        type: ActionTypes.SetState,
        payload: state,
    }),
};

export const reducer = (state: IStateType, action: IActionType) => {
    switch (action.type) {
        case ActionTypes.UpdateFirstName:
            return {
                ...state,
                firstName: action.payload,
                errors: { ...state.errors, firstName: undefined },
            };
        case ActionTypes.UpdateSurname:
            return {
                ...state,
                surname: action.payload,
                errors: { ...state.errors, surname: undefined },
            };
        case ActionTypes.UpdatePhoneNumber:
            return {
                ...state,
                phoneNumber: action.payload,
                errors: { ...state.errors, phoneNumber: undefined },
            };
        case ActionTypes.UpdateImage:
            return { ...state, image: action.payload };
        case ActionTypes.UpdateNotes:
            return { ...state, notes: action.payload };
        case ActionTypes.UpdateErrors:
            return { ...state, errors: action.payload };
        case ActionTypes.UpdateLoading:
            return { ...state, loading: action.payload };
        case ActionTypes.SetState:
            return { ...state, ...action.payload };
        default:
            throw new Error();
    }
};
