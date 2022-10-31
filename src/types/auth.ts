import { User as FirebaseUser } from 'firebase/auth'

export interface ISignInValues {
  email: string
  password: string
}

export interface ISignUpValues {
  name: string
  email: string
  password: string
}

export interface IUserData {
	name: string
}

export interface IUser extends FirebaseUser, IUserData {}
