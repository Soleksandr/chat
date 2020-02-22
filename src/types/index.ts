export interface IUser {
  name: string
  isOnline: boolean
}

export interface IMessage {
  user: IUser['name']
  content: string
  createdAt: string
}
