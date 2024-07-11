

// export const fetchGametypesAction = () => async (dispatch: any) => {
//     try {
//         dispatch(sendRequestStart())
//         const gametypes = await fetchGameTypes()
//         dispatch(fetchGametypesSuccess(gametypes))
//     } catch (error) {
//         dispatch(sendRequestFailure())
//     }
// }

import { createHighlightSuccess, deleteHighlightSuccess, fetchHighlightsSuccess, sendRequestFailure, sendRequestStart, updateHighlightSuccess } from ".."
import { createHighlight, deleteHighlight, fetchHighlights, updateHighlight } from "../../../../services/highlights"

export const fetchHighlightsAction = () => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const highlights = await fetchHighlights()
        dispatch(fetchHighlightsSuccess(highlights))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const createHighlightsAction = (highlight: any) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const newHighlight = await createHighlight(highlight)
        dispatch(createHighlightSuccess(newHighlight))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const updateHighlightsAction = (highlight: any) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const updatedHighlight = await updateHighlight(highlight)
        dispatch(updateHighlightSuccess(updatedHighlight))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const deleteHighlightsAction = (id: number) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        await deleteHighlight(id)
        dispatch(deleteHighlightSuccess(id))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}
