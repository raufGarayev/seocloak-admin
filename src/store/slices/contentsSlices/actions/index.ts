import { createContentSuccess, deleteContentSuccess, getContentsSuccess, sendRequestFailure, sendRequestStart, setSelectedContent, updateContentSuccess } from ".."
import { createContent, deleteContent, getContent, getContents, updateContent } from "../../../../services/contents"


export const fetchContentsAction  = () => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const contents = await getContents()
        dispatch(getContentsSuccess(contents))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const fetchContentAction = (id: number) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const content = await getContent(id)
        dispatch(setSelectedContent(content))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const createContentAction = (content: any) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const newContent = await createContent(content)
        dispatch(createContentSuccess(newContent))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const updateContentAction = (content: any) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const updatedContent = await updateContent(content)
        dispatch(updateContentSuccess(updatedContent))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const deleteContentAction = (id: number) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        await deleteContent(id)
        dispatch(deleteContentSuccess(id))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}