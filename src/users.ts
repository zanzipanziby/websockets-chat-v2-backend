import { User } from './types.js'
import { log } from 'node:util'

let users: User[] = []
console.log(users)

export const findUser = (user: User) => {
  const userName = user.username
  const userRoom = user.room

  return users.find((user) => user.username === userName && user.room === userRoom)
}
export const addUser = (user: User) => {
  const isExist = findUser(user)
  !isExist && users.push(user)
  const currentUser = isExist || user
  return { isExist, currentUser }


}