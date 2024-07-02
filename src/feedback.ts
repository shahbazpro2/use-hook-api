/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { useMemo } from 'react'

interface FeedbackType {
  message: string | string[] | null
  type: string
}

export const feedbackAtom = atom<FeedbackType>({
  message: null,
  type: 'error',
})

export const setFeedbackAtom = atom(null, (_get, set, payload: FeedbackType) => {
  set(feedbackAtom, payload)
})

export const clearFeedbackAtom = atom(null, (_get, set) => {
  set(feedbackAtom, { message: null, type: 'error' })
})

export const useSetFeedback = () => {
  const setFeedback = useSetAtom(setFeedbackAtom)

  return useMemo(() => {
    return (message: string | string[], type: string) =>
      setFeedback({
        message: message ? (Array.isArray(message) ? message : [message]) : null,
        type: type || 'error',
      })
  }, [])
}

export const useFeedbackState = () => {
  const feedbackState = useAtomValue(feedbackAtom)
  const clearState = useSetAtom(clearFeedbackAtom)

  const clearFeedback = useMemo(() => {
    return () => clearState()
  }, [])

  return {
    feedbackState,
    clearFeedback,
  }
}
