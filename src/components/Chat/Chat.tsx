import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import { IUser } from '../../types'
import { Feed } from '../Feed'
import { Header } from '../Header'
import { NewMessageField } from '../NewMessageField'

interface IChatProps {
  user: IUser
}

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    padding: 8,
    margin: 24,
  },
}))

export const Chat: React.FC<IChatProps> = ({ user }) => {
  const classes = useStyles()

  return (
    <Paper elevation={3} className={classes.paper}>
      <Header user={user} />
      <Feed currentUser={user} />
      <NewMessageField name={user.name} />
    </Paper>
  )
}
