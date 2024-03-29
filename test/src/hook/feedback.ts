/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useAtom, useSetAtom } from 'jotai'
import { useMemo } from 'react'

interface FeedbackType {
  message: string | null
  type: string
}

type SetFeedbackType = [string | null, string]

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
    return (payload: SetFeedbackType) =>
      setFeedback({
        message: payload?.[0],
        type: payload?.[1] || 'error',
      })
  }, [])
}

export const useFeedbackState = () => {
  const [feedbackState] = useAtom(feedbackAtom)
  const clearState = useSetAtom(clearFeedbackAtom)

  const clearFeedback = useMemo(() => {
    return () => clearState()
  }, [])

  return [feedbackState, clearFeedback]
}
