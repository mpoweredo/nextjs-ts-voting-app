import { auth, db } from 'data/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { IAuthContext } from 'types/authContext'

const UserContext = createContext<IAuthContext | false>(false)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState()

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const docRef = await doc(db, 'users', response.user.uid)
      await setDoc(docRef, {
        email,
        name,
      })

      return "We've created your account for you."
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (e.message === 'Firebase: Error (auth/email-already-in-use).') {
          throw new Error('Email taken!')
        }
        throw new Error('Something went wrong... Try again later!')
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return 'Successfully logged in!'
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (e.message === 'Firebase: Error (auth/wrong-password).') {
          throw new Error('Credentials which You have passed are invalid!')
        }
        throw new Error('Something went wrong... Try again later!')
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        signUp,
        signIn,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext) as IAuthContext
}
