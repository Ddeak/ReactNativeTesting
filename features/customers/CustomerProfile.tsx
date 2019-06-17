import React, { useState } from "react";
import { NavigationScreenProp } from "react-navigation";

import { LoadingScreen } from "../ui/LoadingScreen";

import { CustomerProfileView } from "./CustomerProfileView";
import { useCustomer } from "./hooks";
import { CustomerService } from "../../db";
import { Actions } from "./reducer";
import { validate } from "./validateProfile";

interface IPropType {
    navigation: NavigationScreenProp<any, any>;
}

export const CustomerProfile = ({ navigation }: IPropType) => {
    const id = navigation.getParam("id");
    const [state, dispatch] = useCustomer(id);
    const [showDialog, setDialog] = useState(false);
    const {
        firstName,
        surname,
        phoneNumber,
        loading,
        notes,
        image,
        errors,
    } = state;

    if (loading) return <LoadingScreen />;

    const toggleDialog = () => setDialog(!showDialog);

    const onSubmit = () => {
        try {
            let errs = validate(state);
            if (errs.hasErrors) {
                dispatch(Actions.setErrors(errs));
                return;
            }

            dispatch(Actions.setLoading(true));

            CustomerService.save({
                id,
                firstName,
                surname,
                phoneNumber,
                image,
                notes,
            });

            navigation.pop();
        } catch (err) {
            console.log("Something went wrong creating a customer: ", err);
            dispatch(Actions.setLoading(false));
        }
    };

    const onDelete = () => {
        dispatch(Actions.setLoading(true));
        try {
            CustomerService.delete(id);
            navigation.pop();
        } catch (err) {
            console.log("Something went wrong deleting a customer: ", err);
            dispatch(Actions.setLoading(false));
        }
    };

    const onImageIconPress = () => {};

    return (
        <CustomerProfileView
            customer={state}
            dispatch={dispatch}
            loading={loading}
            onDelete={onDelete}
            onSubmit={onSubmit}
            onImageIconPress={onImageIconPress}
            showDeleteDialog={showDialog}
            toggleDeleteDialog={toggleDialog}
            errors={errors}
        />
    );
};
