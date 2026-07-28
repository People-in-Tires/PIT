export interface User
{
	id:	number;

	username:	string;
	email:		string;

	first_name:	string;
	last_name:	string;

	country:	string;
	city:		string;

	birthday:	string; // format: YYYY-MM-DD

	two_factor_enabled:	boolean;
}

export interface CreateUser
{
	username:			string;
	email:				string;
	password:			string;
	confirm_password:	string;

	first_name:	string;
	last_name:	string;

	country:	string;
	city:		string;

	birthday:	string; // format: YYYY-MM-DD
}

export interface UpdateUser
{
	first_name?: string;
	last_name?:	 string;

	country?:	string;
	city?:		string;

	birthday?:	string; // format: YYYY-MM-DD
}

export interface LoginRequest
{
	login:		string;
	password:	string;
}

export interface EnableTwoFactorRequest
{
	password: string;
}

export interface DisableTwoFactorRequest
{
	password: string;
}

export interface VerifyTwoFactorRequest
{
	verification_code:	string;
}

export interface ChangePasswordRequest
{
	current_password:	string;
	new_password:		string;
	confirm_password:	string;
}

export interface ChangeEmailRequest
{
	new_email:		string;
	confirm_email:	string;
}

export interface ConfirmEmailChangeRequest
{
	new_email:			string;
	verification_code:	string;
}
