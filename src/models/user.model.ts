export type UserId = string

export interface User {
    userId: UserId
    email: string
    password: string
    hasSubscription: boolean
    createdAt: Date
}