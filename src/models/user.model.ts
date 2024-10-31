export type UserId = string

export interface User {
    userId: UserId
    email: string
    password: string
    hasSubscription: boolean
    shareData: boolean
    newsletter: boolean
    subscriptionRenew: boolean
    autoInsurance: boolean
    createdAt: Date
}