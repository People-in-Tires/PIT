'use client'

import { signup } from "@/app/actions/auth";
import { useActionState } from "react";

export default function Login() {
	const [state, action, pending] = useActionState(signup, undefined)

	return (
		<div className="flex items-center flex-col">
			<img className="size-100" id="logo" src="/PIT.png" alt="Logo" />
		<h1 className="text-5xl/25">Login</h1>
		<form action={action} className="text-2xl flex items-center flex-col">
			<div>
				<label htmlFor="login">Login: </label>
				<input id="login" name="login" placeholder="Username or email" />
			</div>
			{state?.errors?.login && <p>{state.errors.login}</p>}
			<div>
				<label htmlFor="password">Password: </label>
				<input id="password" name="password" placeholder="Password" />
			</div>
			{state?.errors?.password && (
			  <div>
				<p>Password must:</p>
				<ul>
					{state.errors.password.map((error) => (
						<li key={error}>- {error}</li>
					))}
				</ul>
			</div>
			)}
			<div id="forgot-password" className="text-sm/10">
				<button type="button">Forgot Password</button>
			</div>
			<div className="text-2xl/20">
				<button disabled={pending} type="submit">Enter the PIT</button>
			</div>
		</form>
		</div>
	);
}