import { createSlice } from "@reduxjs/toolkit";
import { IOnlinePartner, IOnlinePartnersState } from "../../../types/onlinePartners";

const initialOnlinePartnersState = {
    gameTypeId: null,
    onlinePartners: [],
    loading: false,
    selectedOnlinePartner: null,
    selectedOnlinePartners: [],
    multiSelectMode: false
}

export const onlinePartnersSlice = createSlice({
    name: 'onlinePartners',
    initialState: initialOnlinePartnersState as IOnlinePartnersState,
    reducers: {
        setGameTypeID(state, action) {
            state.gameTypeId = action.payload
        },
        sendRequestStart(state) {
            state.loading = true
        },
        sendRequestFailure(state) {
            state.loading = false
        },
        fetchOnlinePartnersSuccess(state, action) {
            state.onlinePartners = action.payload.sort((a: IOnlinePartner, b: IOnlinePartner) => a.order - b.order)
            state.loading = false
        },
        createOnlinePartnerSuccess(state, action) {
            if(Array.isArray(action.payload)) {
                state.onlinePartners = state.onlinePartners.concat(action.payload)
            } else {
                state.onlinePartners.push(action.payload)
            }
            state.loading = false
        },
        setSelectedOnlinePartner(state, action) {
            state.selectedOnlinePartner = action.payload
            state.loading = false
        },
        setOnlinePartners: (state, action) => {
            state.onlinePartners = action.payload
        },
        updateOnlinePartnersOrderSuccess: (state, action) => {
            state.onlinePartners = action.payload.sort((a: IOnlinePartner, b: IOnlinePartner) => a.order - b.order)
            state.loading = false
        },
        updateOnlinePartnerSuccess: (state, action) => {
            const index = state.onlinePartners.findIndex(
                partner => partner.id === action.payload.id
            )
            state.onlinePartners[index] = action.payload
            state.loading = false
        },
        deleteOnlinePartnerSuccess: (state, action) => {
            if(Array.isArray(action.payload)) {
                state.onlinePartners = state.onlinePartners.filter(
                    partner => !action.payload.includes(partner.id)
                )
            } else {
                state.onlinePartners = state.onlinePartners.filter(
                    partner => partner.id !== action.payload
                )
            }
            state.loading = false
        },
        clearPartners: (state) => {
            state.onlinePartners = []
        },
        setSelectedOnlinePartners: (state, action) => {
            state.selectedOnlinePartners = action.payload
        },
        setMultiSelectMode: (state, action) => {
            state.multiSelectMode = action.payload
        }
    }
})

export const {
    fetchOnlinePartnersSuccess,
    createOnlinePartnerSuccess,
    sendRequestStart,
    setGameTypeID,
    sendRequestFailure,
    setSelectedOnlinePartner,
    setOnlinePartners,
    updateOnlinePartnersOrderSuccess,
    updateOnlinePartnerSuccess,
    deleteOnlinePartnerSuccess,
    clearPartners,
    setSelectedOnlinePartners,
    setMultiSelectMode
} = onlinePartnersSlice.actions