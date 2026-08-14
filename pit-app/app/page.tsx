import { signup } from "./actions/auth/auth";
import ClickButton from "./button";

export default function Login() {
	return (
		<div className="flex items-center flex-col">
			<img className="size-100" id="logo" src="/PIT.png" alt="Logo" />
		<h1 className="text-5xl/25">Login</h1>
		<form action={signup} className="text-2xl login">
			<div>
				<label htmlFor="login">Login: </label>
				<input id="login" name="login" type="text" />
			</div>
			<div>
				<label htmlFor="password">Password: </label>
				<input id="password" name="password" type="password" />
			</div>
			<div id="error-message"></div>
		</form>
		<div id="forgot-password">
			<ClickButton type="button" text="Forgot password">
				Forgot Password
			</ClickButton></div>
		<div className="text-2xl/20">
			<ClickButton type="submit" text="Enter the PIT">
				Enter the PIT
			</ClickButton></div>
		</div>
	);
}