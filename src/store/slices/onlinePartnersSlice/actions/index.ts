import { createOnlinePartnerSuccess, deleteOnlinePartnerSuccess, fetchOnlinePartnersSuccess, sendRequestFailure, sendRequestStart, setSelectedOnlinePartner, updateOnlinePartnersOrderSuccess, updateOnlinePartnerSuccess } from ".."
import { cleanObject } from "../../../../helpers"
import { createOnlinePartner, deleteOnlinePartner, fetchOnlinePartners, getOnlinePartner, updateOnlinePartner, updateOnlinePartnersOrder, updateOnlinePartnerStatus } from "../../../../services/onlinePartners"

export const fetchOnlinePartnersAction = (gameTypeId: number, filters: any) => async (dispatch: any) => {
    dispatch(sendRequestStart())
    try {
        const response = await fetchOnlinePartners(gameTypeId, cleanObject(filters))
        dispatch(fetchOnlinePartnersSuccess(response))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const createOnlinePartnerAction = (data: any) => async (dispatch: any) => {
    dispatch(sendRequestStart())
    try {
        const response = await createOnlinePartner(data)
        dispatch(createOnlinePartnerSuccess(response))
    } catch (error) {
        console.log("burda qaqa action")
        dispatch(sendRequestFailure())
        throw error
    }
}

export const updateOnlinePartnersOrderAction = (data: any, gametypeId: number | null) => async (dispatch: any) => {
    dispatch(sendRequestStart())
    try {
        const response = await updateOnlinePartnersOrder(data, gametypeId)
        dispatch(updateOnlinePartnersOrderSuccess(response))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const updateOnlinePartnerAction = (id: number, data: any) => async (dispatch: any) => {
    dispatch(sendRequestStart())
    try {
        const response = await updateOnlinePartner(id, data)
        dispatch(updateOnlinePartnerSuccess(response))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const deleteOnlinePartnerAction = (id: number) => async (dispatch: any) => {
    dispatch(sendRequestStart())
    try {
        await deleteOnlinePartner(id)
        dispatch(deleteOnlinePartnerSuccess(id))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const getOnlinePartnerAction = (id: number) => async (dispatch: any) => {
    dispatch(sendRequestStart())
    try {
        const response = await getOnlinePartner(id)
        dispatch(setSelectedOnlinePartner(response))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const updateOnlinePartnerStatusAction = (id: number, status: boolean) => async (dispatch: any) => {
    dispatch(sendRequestStart())
    try {
        const response = await updateOnlinePartnerStatus(id, status)
        dispatch(updateOnlinePartnerSuccess(response))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}
