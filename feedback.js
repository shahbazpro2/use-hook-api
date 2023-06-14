import { atom, useAtom, useSetAtom } from "jotai"
import { useMemo } from "react"

export const feedbackAtom = atom({
    message: null,
    type: 'error'
})

export const setFeedbackAtom = atom(null, (get, set, payload) => {
    set(feedbackAtom, payload)
})

export const clearFeedbackAtom = atom(null, (get, set) => {
    set(feedbackAtom, { message: null, type: 'error' })
})

export const useSetFeedback = () => {
    const setFeedback = useSetAtom(setFeedbackAtom)

    return useMemo(() => {
        return (payload) => setFeedback({
            message: payload?.[0],
            type: payload?.[1] || 'error'
        })
    })
}



export const useFeedbackState = () => {
    const [feedbackState] = useAtom(feedbackAtom)
    const clearState = useSetAtom(clearFeedbackAtom)

    const clearFeedback = useMemo(() => {
        return () => clearState()
    }, [])

    return [
        feedbackState,
        clearFeedback
    ]
}