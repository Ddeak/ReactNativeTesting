export type StateType = {
    firstName: string;
    surname: string;
    phoneNumber: string;
    loading: boolean;
};

type ActionType = {
    type: string;
    payload: any;
};

export const initialReducerState = {
    firstName: "",
    surname: "",
    phoneNumber: "",
    loading: false,
};

type ActionTypes = {
    [key: string]: string;
};

export const ActionTypes: ActionTypes = {
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
    setState: (state: StateType) => ({
        type: ActionTypes.SetState,
        payload: state,
    }),
};

export const reducer = (state: StateType, action: ActionType) => {
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
