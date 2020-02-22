import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FaceIcon from '@material-ui/icons/Face'
import React from 'react'

import { IMessage } from '../../types'

interface IMessageProps {
  message: IMessage
  positionRight?: boolean
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: (props: any) =>
      props.positionRight ? 'flex-end' : 'flex-start',
  },
  root: {
    width: '70%',
    margin: 4,
  },
  cardContent: {
    padding: 8,

    '&:last-child': {
      paddingBottom: 8,
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    display: 'flex',
    fontSize: 14,
  },
  date: {
    fontSize: 10,
  },
  userName: {
    marginLeft: 4,
  },
})

export const Message: React.FC<IMessageProps> = ({
  message,
  positionRight,
}) => {
  const classes = useStyles({ positionRight })

  const { content, createdAt, user } = message

  return (
    <div className={classes.container}>
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            <FaceIcon fontSize="small" />
            <span className={classes.userName}>{user}</span>
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            {content}
          </Typography>
          <Typography className={classes.date} color="textSecondary">
            {createdAt}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
