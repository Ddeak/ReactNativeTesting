import React from "react";
import { withNavigation, NavigationScreenProp } from "react-navigation";

import { LoadingScreen } from "../ui/LoadingScreen";

import { CustomerProfileView } from "./CustomerProfileView";
import { useCustomer } from "./hooks";
import { CustomerService } from "../../db";
import { Actions } from "./reducer";

interface IPropType {
    navigation: NavigationScreenProp<any, any>;
}

export const CustomerProfile = withNavigation(({ navigation }: IPropType) => {
    const id = navigation.getParam("id");
    const onDone = navigation.getParam("onDone");
    const [state, dispatch] = useCustomer(id);
    const { firstName, surname, phoneNumber, loading, notes, image } = state;

    if (loading) return <LoadingScreen />;

    const onSubmit = () => {
        dispatch(Actions.setLoading(true));
        try {
            CustomerService.save({
                id,
                firstName,
                surname,
                phoneNumber,
                image,
                notes,
            });

            if (onDone) onDone();
            navigation.pop();
            dispatch(Actions.setLoading(false));
        } catch (err) {
            console.log("Something went wrong creating a customer: ", err);
            dispatch(Actions.setLoading(false));
        }
    };

    const onDelete = () => {
        dispatch(Actions.setLoading(true));
        try {
            CustomerService.delete(id);
            if (onDone) onDone();
            navigation.pop();
            dispatch(Actions.setLoading(false));
        } catch (err) {
            console.log("Something went wrong deleting a customer: ");
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
        />
    );
});
