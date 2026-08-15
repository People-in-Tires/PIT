"use server";

import { FormState, LoginFormSchema } from "@/app/lib/defenitions";

export async function signup(state: FormState, formData: FormData) {
	const validatedFields = LoginFormSchema.safeParse({
		login: formData.get('login'),
		password: formData.get('password'),
	})
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}
}