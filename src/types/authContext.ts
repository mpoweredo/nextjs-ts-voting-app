export interface IAuthContext {
	signUp: (email: string, password: string, name: string) => Promise<string | undefined>;
}
