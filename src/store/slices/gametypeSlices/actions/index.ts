import { fetchGametypesSuccess, sendRequestFailure, sendRequestStart, createGametypeSuccess, deleteGametypeteSuccess, updateGametypeSuccess } from ".."
import { fetchGameTypes, createGameType, deleteGameType, updateGameType } from "../../../../services/gametypes"


export const fetchGametypesAction = () => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const gametypes = await fetchGameTypes()
        dispatch(fetchGametypesSuccess(gametypes))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const createGametypesAction = (gametypes: any) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const newGametype = await createGameType(gametypes)
        dispatch(createGametypeSuccess(newGametype))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const updateGametypesAction = (id: number, gametypes: any) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const updatedGametype = await updateGameType(id, gametypes)
        dispatch(updateGametypeSuccess(updatedGametype))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const deleteGametypesAction = (id: number) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        await deleteGameType(id)
        dispatch(deleteGametypeteSuccess(id))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}