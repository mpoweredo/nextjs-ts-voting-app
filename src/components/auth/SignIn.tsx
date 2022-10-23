import { Box, Button, Center, Container, FormLabel, Heading, Stack } from '@chakra-ui/react';
import { signinSchema } from 'data/validationSchemas';
import { Formik, Form, Field } from 'formik';
import { SignInValues } from 'types/auth';
import Input from 'UI/Input';

const SignIn = () => {
	const initialValues = {
		email: '',
		password: '',
	};

	const submitHandler = (values: SignInValues) => {
		console.log(values);
	};

	return (
		<Container h='100vh'>
			<Center w='full' h='full'>
				<Stack spacing={6} maxW='400px' rounded='md' w='full' bg='gray.700' px={4} py={5}>
					<Center>
						<Heading fontSize='3xl' color='gray.300' as='h1'>
							Sign In
						</Heading>
					</Center>
					<Box>
						<Stack>
							<Formik validationSchema={signinSchema} initialValues={initialValues} onSubmit={submitHandler}>
								{() => (
									<Stack as={Form} spacing={7}>
										<Stack>
											<Stack>
												<FormLabel fontSize='xl' margin={0} htmlFor='email'>
													Email
												</FormLabel>
												<Field name='email' id='email' type='email' _hover={{ bg: 'gray.500' }} bg='gray.600' color='gray.50' component={Input} />
											</Stack>
											<Stack>
												<FormLabel fontSize='xl' margin={0} htmlFor='password'>
													Password
												</FormLabel>
												<Field
													name='password'
													id='password'
													type='password'
													_hover={{ bg: 'gray.500' }}
													bg='gray.600'
													color='gray.50'
													component={Input}
												/>
											</Stack>
										</Stack>
										<Button height='43px' type='submit' bg='gray.800' _hover={{ bg: 'gray.900' }}>
											Sign in
										</Button>
									</Stack>
								)}
							</Formik>
						</Stack>
					</Box>
				</Stack>
			</Center>
		</Container>
	);
};

export default SignIn;
