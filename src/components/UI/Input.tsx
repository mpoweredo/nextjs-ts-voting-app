import { Input as ChakraInput, Stack, InputProps, Text } from '@chakra-ui/react';
import { ErrorMessage, FieldProps } from 'formik';

const Input = ({ field, form: { touched, errors }, ...props }: FieldProps) => {
	const error = touched[field.name] && errors[field.name];

	return (
		<Stack>
			<ChakraInput
				{...field}
				{...props}
				borderWidth={error ? '2px' : '0px'}
				borderColor={error ? 'red.300': 'transparent'}
				paddingX={'2.5'}
				_focus={{ borderWidth: '2px', borderColor: error ? 'red.300' : 'blue.100', bg: 'gray.500' }}
				variant='filled'
			/>
			<ErrorMessage name={field.name}>{msg => <Text color='red.300'>{msg}</Text>}</ErrorMessage>
		</Stack>
	);
};

export default Input;
