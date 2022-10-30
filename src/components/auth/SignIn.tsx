import {
  Box,
  Button,
  Center,
  Container,
  FormLabel,
  Heading,
  Stack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { signinSchema } from 'data/validationSchemas'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import useAuth from 'hooks/useAuth'
import Link from 'next/link'
import { ISignInValues } from 'types/auth'
import Input from 'UI/Input'

const initialValues: ISignInValues = {
  email: '',
  password: '',
}

const SignIn = () => {
  const { isLoading, signIn } = useAuth()

  const submitHandler = async (values: ISignInValues, actions: FormikHelpers<ISignInValues>) => {
    await signIn(values, actions)
  }

  return (
    <Container h="100vh">
      <Center w="full" h="full">
        <Stack spacing={6} maxW="400px" rounded="md" w="full" bg="gray.700" px={4} py={5}>
          <Center>
            <Heading fontSize="3xl" color="gray.300" as="h1">
              Sign In
            </Heading>
          </Center>
          <Box>
            <Stack spacing={5}>
              <Formik validationSchema={signinSchema} initialValues={initialValues} onSubmit={submitHandler}>
                {() => (
                  <Stack as={Form} spacing={7}>
                    <Stack>
                      <Stack>
                        <FormLabel fontSize="xl" margin={0} htmlFor="email">
                          Email
                        </FormLabel>
                        <Field
                          name="email"
                          id="email"
                          type="email"
                          _hover={{ bg: 'gray.500' }}
                          bg="gray.600"
                          color="gray.50"
                          component={Input}
                        />
                      </Stack>
                      <Stack>
                        <FormLabel fontSize="xl" margin={0} htmlFor="password">
                          Password
                        </FormLabel>
                        <Field
                          name="password"
                          id="password"
                          type="password"
                          _hover={{ bg: 'gray.500' }}
                          bg="gray.600"
                          color="gray.50"
                          component={Input}
                        />
                      </Stack>
                    </Stack>
                    <Button
                      isLoading={isLoading}
                      height="43px"
                      type="submit"
                      bg="gray.800"
                      _hover={{ bg: 'gray.900' }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                )}
              </Formik>
              <Text fontSize="medium" color="gray.400" fontWeight={600}>
                Don&lsquo;t have an account? Sign up{' '}
                <Link href="/signup">
                  <ChakraLink color="teal.200">here.</ChakraLink>
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Center>
    </Container>
  )
}

export default SignIn
