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
import { signupSchema } from 'data/validationSchemas'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { ISignUpValues } from 'types/auth'
import Input from 'UI/Input'
import Link from 'next/link'
import useAuth from 'hooks/useAuth'

const initialValues: ISignUpValues = {
  name: '',
  email: '',
  password: '',
}

const SignUp = () => {
  const { isLoading, signUp } = useAuth()

  const submitHandler = async (values: ISignUpValues, actions: FormikHelpers<ISignUpValues>) => {
    await signUp(values, actions)
  }

  return (
    <Container h="100vh">
      <Center w="full" h="full">
        <Stack spacing={6} maxW="400px" rounded="md" w="full" bg="gray.700" px={4} py={5}>
          <Center>
            <Heading fontSize="3xl" color="gray.300" as="h1">
              Sign Up
            </Heading>
          </Center>
          <Box>
            <Stack spacing={5}>
              <Formik validationSchema={signupSchema} initialValues={initialValues} onSubmit={submitHandler}>
                {() => (
                  <Stack as={Form} spacing={7}>
                    <Stack>
                      <Stack>
                        <FormLabel fontSize="xl" margin={0} htmlFor="name">
                          Name
                        </FormLabel>
                        <Field
                          name="name"
                          id="name"
                          type="text"
                          _hover={{ bg: 'gray.500' }}
                          bg="gray.600"
                          color="gray.50"
                          component={Input}
                        />
                      </Stack>
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
                      Sign Up
                    </Button>
                  </Stack>
                )}
              </Formik>
              <Text fontSize="medium" color="gray.400" fontWeight={600}>
                Already have an account? Sign in{' '}
                <Link href="/signin">
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

export default SignUp
