import { ICustomer } from "../../types";

export interface IStateType {
    date: Date;
    duration: number;
    startTime: string;
    customer: ICustomer | undefined;
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
    date: new Date(),
    duration: 0,
    startTime: "",
    loading: false,
};

export const ActionTypes: IActionTypes = {
    UpdateDate: "@Appointment/UpdateDate",
    UpdateDuration: "@Appointment/UpdateDuration",
    UpdateCustomer: "@Appointment/UpdateCustomer",
    UpdateStartTime: "@Appointment/UpdateStartTime",
    UpdateLoading: "@Appointment/UpdateLoading",
    SetState: "@Appointment/SetState",
};

export const Actions = {
    setDate: (date: Date) => ({
        type: ActionTypes.UpdateDate,
        payload: date,
    }),
    setDuration: (duration: number) => ({
        type: ActionTypes.UpdateDuration,
        payload: duration,
    }),
    setCustomer: (customer?: ICustomer | undefined) => ({
        type: ActionTypes.UpdateCustomer,
        payload: customer,
    }),
    setStartTime: (startTime: string) => ({
        type: ActionTypes.UpdateStartTime,
        payload: startTime,
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
    const { payload } = action;
    switch (action.type) {
        case ActionTypes.UpdateDate:
            return { ...state, date: payload };
        case ActionTypes.UpdateDuration:
            return { ...state, duration: payload };
        case ActionTypes.UpdateCustomer:
            return { ...state, customer: payload };
        case ActionTypes.UpdateStartTime:
            return { ...state, startTime: payload };
        case ActionTypes.UpdateLoading:
            return { ...state, loading: payload };
        case ActionTypes.SetState:
            return { ...payload };
        default:
            return state;
    }
};
