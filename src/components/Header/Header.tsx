import { makeStyles } from '@material-ui/core/styles'
import Face from '@material-ui/icons/Face'
import React from 'react'

import { IUser } from '../../types'

interface IChatProps {
  user: IUser
}

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  h2: {
    margin: 4,
  },
}))

export const Header: React.FC<IChatProps> = ({ user }) => {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <Face color="primary" />
      <h2 className={classes.h2}>{user.name}</h2>
    </div>
  )
}
