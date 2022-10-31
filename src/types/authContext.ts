import { IUser } from "./auth"

export interface IAuthContext {
  signUp: (email: string, password: string, name: string) => Promise<string | undefined>
  signIn: (email: string, password: string) => Promise<string | undefined>
  isLoading: boolean
  user: IUser | null
}
