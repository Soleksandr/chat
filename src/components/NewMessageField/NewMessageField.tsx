import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { ChangeEvent, useContext, useState } from 'react'

import { StoreContext } from '../../store'
import { IUser } from '../../types'

interface INewMessageField {
  name: IUser['name']
}
const useStyles = makeStyles(theme => ({
  button: {
    float: 'right',
  },
}))

export const NewMessageField: React.FC<INewMessageField> = ({ name }) => {
  const classes = useStyles()

  const { dispatch } = useContext(StoreContext)
  const [message, setMessage] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const message = e.target.value
    setMessage(message)
  }

  const send = () => {
    message &&
      dispatch &&
      dispatch({
        type: 'postMessage',
        payload: {
          content: message,
          user: name,
          createdAt: new Date().toLocaleString(),
        },
      })

    setMessage('')
  }

  return (
    <div>
      <TextField
        multiline
        fullWidth
        rows="3"
        margin="dense"
        label="Message"
        variant="outlined"
        value={message}
        onChange={onChange}
      />
      <Button
        className={classes.button}
        onClick={send}
        variant="contained"
        color="primary"
      >
        post
      </Button>
    </div>
  )
}
