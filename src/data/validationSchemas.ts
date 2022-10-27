import * as Yup from 'yup';

const signinSchema = Yup.object({
	email: Yup.string().email("That's not an email!").required('Email is required!'),
	password: Yup.string().min(7, 'Password must have atleast 7 characters!').required('Password is required!'),
});

const signupSchema = Yup.object({
	name: Yup.string().min(2, 'Name must have atleast 2 characters!').required('Name is required!'),
	email: Yup.string().email("That's not an email!").required('Email is required!'),
	password: Yup.string().min(7, 'Password must have atleast 7 characters!').required('Password is required!'),
});

export { signinSchema, signupSchema };