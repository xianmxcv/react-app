export type UserRole = 'user' | 'admin'

export interface IUser {
  userName: string
  userId: string
  role?: UserRole
}