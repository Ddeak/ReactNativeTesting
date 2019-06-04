import moment from "moment";
import { ICustomer } from "../../types";

export interface IStateType {
    date: Date;
    duration: number;
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

const roundDate = (date: Date): Date => {
    const m = moment(date);
    const roundedDate = m.minute(Math.round(m.minute() / 15) * 15);
    return roundedDate.toDate();
};

export const initialReducerState = {
    date: roundDate(new Date()),
    duration: 0,
    loading: false,
};

export const ActionTypes: IActionTypes = {
    UpdateDate: "@Appointment/UpdateDate",
    UpdateDuration: "@Appointment/UpdateDuration",
    UpdateCustomer: "@Appointment/UpdateCustomer",
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
            const newDate = roundDate(payload);
            return { ...state, date: newDate };
        case ActionTypes.UpdateDuration:
            return { ...state, duration: payload };
        case ActionTypes.UpdateCustomer:
            return { ...state, customer: payload };
        case ActionTypes.UpdateLoading:
            return { ...state, loading: payload };
        case ActionTypes.SetState:
            return { ...payload };
        default:
            return state;
    }
};
