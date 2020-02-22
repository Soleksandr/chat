import React, {
  Dispatch,
  ReducerAction,
  useCallback,
  useMemo,
  useReducer,
} from 'react'

import { IMessage, IUser } from '../types'

interface IStore {
  users: IUser[]
  messages: IMessage[]
}

interface IStoreContext extends IStore {
  dispatch?: Dispatch<ReducerAction<typeof reducer>>
}

interface IMessageAction {
  type: 'postMessage'
  payload: IMessage
}

interface IUserAction {
  type: 'join'
  payload: IUser['name']
}

export const initialState: IStore = {
  users: [
    { name: 'Hulk', isOnline: true },
    { name: 'Thor', isOnline: true },
  ],
  messages: [],
}

const reducer = (
  state: IStore,
  action: IUserAction | IMessageAction,
): IStore => {
  switch (action.type) {
    case 'join':
      return {
        ...state,
        users: [...state.users, { name: action.payload, isOnline: true }],
      }
    case 'postMessage':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    default:
      return { ...state }
  }
}

export const StoreContext = React.createContext<IStoreContext>(initialState)

export const Provider: React.FC<{ initialState: IStore }> = ({
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const memorizedDispatch = useCallback(dispatch, [dispatch])

  const value = useMemo(() => ({ ...state, dispatch: memorizedDispatch }), [
    state,
    memorizedDispatch,
  ])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
