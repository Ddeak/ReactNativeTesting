import { IPet } from "../../types";

export interface IStateType {
    firstName: string;
    surname: string;
    phoneNumber: string;
    pets?: IPet[];
    notes?: string;
    image?: string;
    loading: boolean;
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
};

export const ActionTypes: IActionTypes = {
    UpdateFirstName: "@Customer/UpdateFirstName",
    UpdateSurname: "@Customer/UpdateSurname",
    UpdatePhoneNumber: "@Customer/UpdatePhoneNumber",
    UpdateImage: "@Customer/UpdateImage",
    UpdateNotes: "@Customer/UpdateNotes",
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
    setState: (state: IStateType) => ({
        type: ActionTypes.SetState,
        payload: state,
    }),
};

export const reducer = (state: IStateType, action: IActionType) => {
    switch (action.type) {
        case ActionTypes.UpdateFirstName:
            return { ...state, firstName: action.payload };
        case ActionTypes.UpdateSurname:
            return { ...state, surname: action.payload };
        case ActionTypes.UpdatePhoneNumber:
            return { ...state, phoneNumber: action.payload };
        case ActionTypes.UpdateImage:
            return { ...state, image: action.payload };
        case ActionTypes.UpdateNotes:
            return { ...state, notes: action.payload };
        case ActionTypes.UpdateLoading:
            return { ...state, loading: action.payload };
        case ActionTypes.SetState:
            return { ...action.payload };
        default:
            throw new Error();
    }
};
