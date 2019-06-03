import { useReducer, useEffect } from "react";
import { reducer, Actions, initialReducerState } from "./reducer";
import { AppointmentService } from "../../db";

export const useAppointment = (id: string) => {
    const [state, dispatch] = useReducer(reducer, initialReducerState);

    if (!id) return [state, dispatch];

    useEffect(() => {
        const fetchCustomer = () => {
            dispatch(Actions.setLoading(true));
            const data = AppointmentService.findById(id);

            if (data) {
                dispatch(Actions.setState({ ...data, loading: false }));
            } else dispatch(Actions.setLoading(false));
        };

        fetchCustomer();
    }, []);

    return [state, dispatch];
};
