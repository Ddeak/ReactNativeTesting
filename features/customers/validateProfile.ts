import { CustomerErrors, IStateType } from "./reducer";

export const validate = (state: IStateType): CustomerErrors => {
    const errorState: CustomerErrors = {};
    if (!state.firstName) errorState.firstName = "First Name must be set.";
    if (!state.surname) errorState.surname = "Surname must be set.";
    if (!state.phoneNumber) errorState.phoneNumber = "Phone number must be set";

    return errorState;
};
