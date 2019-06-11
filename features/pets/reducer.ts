import { ICustomer } from "../../types";

export interface IStateType {
    name: string;
    breed: string;
    owner: ICustomer | undefined;
    notes: string;
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
    name: "",
    breed: "",
    notes: "",
    loading: false,
};

export const ActionTypes: IActionTypes = {
    UpdateName: "@Pet/UpdateName",
    UpdateBreed: "@Pet/UpdateBreed",
    UpdateOwner: "@Pet/UpdateOwner",
    UpdateNotes: "@Pet/UpdateNotes",
    UpdateLoading: "@Pet/UpdateLoading",
    SetState: "@Pet/SetState",
};

export const Actions = {
    setName: (name: string) => ({
        type: ActionTypes.UpdateName,
        payload: name,
    }),
    setBreed: (breed: string) => ({
        type: ActionTypes.UpdateBreed,
        payload: breed,
    }),
    setOwner: (owner?: ICustomer | undefined) => ({
        type: ActionTypes.UpdateOwner,
        payload: owner,
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
        case ActionTypes.UpdateName:
            return { ...state, name: action.payload };
        case ActionTypes.UpdateBreed:
            return { ...state, breed: action.payload };
        case ActionTypes.UpdateOwner:
            return { ...state, owner: action.payload };
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
