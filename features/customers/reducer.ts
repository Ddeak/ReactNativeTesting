export interface IStateType {
    firstName: string;
    surname: string;
    phoneNumber: string;
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
    loading: false,
};

export const ActionTypes: IActionTypes = {
    UpdateFirstName: "@Customer/UpdateFirstName",
    UpdateSurname: "@Customer/UpdateSurname",
    UpdatePhoneNumber: "@Customer/UpdatePhoneNumber",
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
        case ActionTypes.UpdateLoading:
            return { ...state, loading: action.payload };
        case ActionTypes.SetState:
            return { ...action.payload };
        default:
            throw new Error();
    }
};
