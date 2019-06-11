import React, { useState } from "react";
import { NavigationScreenProp } from "react-navigation";

import { PetProfileView } from "./PetProfileView";
import { LoadingScreen } from "../ui";

import { usePet } from "./hooks";
import { Actions } from "./reducer";
import { ICustomer } from "../../types";
import { PetService } from "../../db";

interface IPropsType {
    navigation: NavigationScreenProp<any, any>;
}

export const PetProfile = ({ navigation }: IPropsType) => {
    const id = navigation.getParam("id");
    const onDone = navigation.getParam("onDone");
    const [state, dispatch] = usePet(id);
    const [showDialog, setDialog] = useState(false);
    const { name, breed, owner, notes, loading } = state;

    if (loading) return <LoadingScreen />;

    const onDelete = () => {
        dispatch(Actions.setLoading(true));
        try {
            PetService.delete(id);
            if (onDone) onDone();
            navigation.pop();
        } catch (err) {
            console.log("Something went wrong deleting a pet: ", err);
            dispatch(Actions.setLoading(false));
        }
    };

    const onSubmit = () => {
        dispatch(Actions.setLoading(true));
        try {
            PetService.save({ id, name, breed, owner, notes });

            if (onDone) onDone();
            navigation.pop();
            dispatch(Actions.setLoading(false));
        } catch (err) {
            console.log("Something went wrong creating a pet: ", err);
            dispatch(Actions.setLoading(false));
        }
    };

    const onAddCustomer = () => {
        navigation.push("CustomerList", {
            onRowPress: (customer: ICustomer) => {
                dispatch(Actions.setOwner(customer));
                navigation.pop();
            },
        });
    };

    const toggleDialog = () => setDialog(!showDialog);

    return (
        <PetProfileView
            pet={state}
            dispatch={dispatch}
            loading={loading}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onAddCustomer={onAddCustomer}
            showDeleteDialog={showDialog}
            toggleDeleteDialog={toggleDialog}
        />
    );
};
