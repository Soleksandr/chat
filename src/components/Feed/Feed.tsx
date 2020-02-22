import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import React, { useContext, useEffect, useState } from 'react'

import { StoreContext } from '../../store'
import { IUser } from '../../types'
import { Message } from '../Message'

interface IFeedProps {
  currentUser: IUser
}

const useStyles = makeStyles(theme => ({
  feed: {
    position: 'relative',
    height: 400,
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: theme.shape.borderRadius,
    overflowY: 'auto',
  },
  alert: {
    position: 'absolute',
    bottom: 5,
  },
}))

export const Feed: React.FC<IFeedProps> = ({ currentUser }) => {
  const classes = useStyles()

  const { messages, users } = useContext(StoreContext)
  const [newVisitorName, setNewVisitorName] = useState()
  const newUsersQueueRef = React.useRef<string[]>([])
  const previousUsersRef = React.useRef({ length: 2 })

  useEffect(() => {
    const processQueue = () => {
      if (newUsersQueueRef.current.length) {
        const name = newUsersQueueRef.current.shift()
        setNewVisitorName(name)
      } else {
        setNewVisitorName(null)
      }
    }

    const addToQueue = (user: string) => {
      newUsersQueueRef.current.push(user)

      if (!newVisitorName) {
        processQueue()
      }
    }
    if (users.length > previousUsersRef.current.length) {
      previousUsersRef.current.length = users.length

      const newUser = users[users.length - 1]

      addToQueue(newUser.name)

      setTimeout(() => {
        processQueue()
      }, 4000)
    }
  }, [newVisitorName, users])

  return (
    <div className={classes.feed}>
      {messages.map((message, i) => (
        <Message
          positionRight={currentUser.name === message.user}
          key={i}
          message={message}
        />
      ))}
      {newVisitorName && (
        <Alert className={classes.alert} severity="info">
          {newVisitorName} has come to chat
        </Alert>
      )}
    </div>
  )
}
