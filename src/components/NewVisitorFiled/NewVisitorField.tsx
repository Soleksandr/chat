import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { ChangeEvent, useContext, useState } from 'react'

import { StoreContext } from '../../store'

const useStyles = makeStyles(() => ({
  newVisitor: {
    margin: 16,
  },
}))

export const NewVisitorField: React.FC = () => {
  const classes = useStyles()

  const [validationError, setValidationError] = useState()
  const [name, setName] = React.useState('')
  const { dispatch, users } = useContext(StoreContext)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    validationError && setValidationError('')
    setName(e.target.value)
  }

  const validateName = (name: string) => {
    if (!name) {
      return 'Enter your name'
    }

    const isNameTaken = users.some(user => user.name === name)

    return isNameTaken ? `Name ${name} already taken` : null
  }

  const joinChat = () => {
    const errorMessage = validateName(name)

    if (errorMessage) {
      setValidationError(errorMessage)
    } else {
      dispatch && dispatch({ type: 'join', payload: name })
      setName('')
    }
  }

  return (
    <div className={classes.newVisitor}>
      <Button onClick={joinChat} variant="contained" color="primary">
        join chat
      </Button>
      <div>
        <TextField
          variant="outlined"
          label="Enter name"
          margin="dense"
          value={name}
          onChange={onChange}
          error={!!validationError}
          helperText={validationError}
        />
      </div>
    </div>
  )
}
