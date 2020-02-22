import { makeStyles } from '@material-ui/core/styles'
import React, { useContext } from 'react'

import { StoreContext } from '../../store'
import { Chat } from '../Chat'
import { NewVisitorField } from '../NewVisitorFiled'

const useStyles = makeStyles(theme => ({
  chats: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
}))

export const Layout: React.FC = () => {
  const classes = useStyles()

  const { users } = useContext(StoreContext)

  const usersOnline = users.filter(user => user.isOnline)

  const chats = usersOnline.map((user, i) => <Chat key={i} user={user} />)

  return (
    <div>
      <NewVisitorField />
      <div className={classes.chats}>{chats}</div>
    </div>
  )
}
