import { CustomerErrors, IStateType } from "./reducer";

export const validate = (state: IStateType): CustomerErrors => {
    const errorState: CustomerErrors = { hasErrors: false };
    if (!state.firstName) {
        errorState.firstName = "First Name must be set.";
        errorState.hasErrors = true;
    }
    if (!state.surname) {
        errorState.surname = "Surname must be set.";
        errorState.hasErrors = true;
    }
    if (!state.phoneNumber) {
        errorState.phoneNumber = "Phone number must be set";
        errorState.hasErrors = true;
    }

    return errorState;
};
