import { useToast } from '@chakra-ui/react'
import { FormikHelpers } from 'formik'
import { useCallback, useState } from 'react'
import { UserAuth } from 'store/AuthContext'
import { ISignInValues, ISignUpValues } from 'types/auth'

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const { signIn: signInFunction, signUp: signUpFunction } = UserAuth()

  const signIn = useCallback(
    async ({ email, password }: ISignInValues, { setFieldValue }: FormikHelpers<ISignInValues>) => {
      try {
        setIsLoading(true)
        const response = await signInFunction(email, password)
        toast({
          title: 'Success',
          description: response,
          status: 'success',
        })
      } catch (e) {
        if (e instanceof Error) {
          toast({
            title: "Couldn't log you!",
            description: e.message,
            status: 'error',
          })

          setFieldValue('password', '', false)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [toast, signInFunction]
  )

  const signUp = useCallback(
    async ({ email, password, name }: ISignUpValues, { setFieldValue }: FormikHelpers<ISignUpValues>) => {
      try {
        setIsLoading(true)
        const response = await signUpFunction(email, password, name)
        toast({
          title: 'Account created.',
          description: response,
          status: 'success',
        })
      } catch (e) {
        if (e instanceof Error) {
          toast({
            title: 'Creating account failed!',
            description: e.message,
            status: 'error',
          })

          setFieldValue('password', '', false)
          setFieldValue('email', '', false)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [toast, signUpFunction]
  )

  return { isLoading, signIn, signUp }
}

export default useAuth
