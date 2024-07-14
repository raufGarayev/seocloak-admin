import { createPartnerSuccess, deletePartnerSuccess, getPartnersSuccess, sendRequestFailure, sendRequestStart, updatePartnerSuccess } from "..";
import { cleanObject } from "../../../../helpers";
import { createPartner, deletePartner, getPartners, updatePartner } from "../../../../services/partners";

export const fetchPartnersAction = (params?: any) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const response = await getPartners(cleanObject(params));
        dispatch(getPartnersSuccess(response));
    } catch (error) {
        console.error(error);
        dispatch(sendRequestFailure());
    }
}

export const createPartnerAction = (data: any) => async (dispatch: any) => {
    try {

        dispatch(sendRequestStart())
        const response = await createPartner(data);
        dispatch(createPartnerSuccess(response));
    } catch (error) {
        dispatch(sendRequestFailure());
    }
}

export const updatePartnerAction = (data: any) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const response = await updatePartner(data);
        dispatch(updatePartnerSuccess(response));
    } catch (error) {
        dispatch(sendRequestFailure());
    }
}

export const deletePartnerAction = (id: number) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        await deletePartner(id);
        dispatch(deletePartnerSuccess(id));
    } catch (error) {
        dispatch(sendRequestFailure());
    }
}

