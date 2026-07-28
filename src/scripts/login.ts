const form = document.getElementById("login-form") as HTMLFormElement;
const loginInput = document.getElementById("login") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", async function(event)
{
	event.preventDefault();
	
	const login = loginInput.value;
	const password = passwordInput.value;

	if (login == "" || password == "")
	{
		console.log("Please fill in all fields.");
		return;
	}
	console.log(login);
	console.log(password);
	console.log("Sending login request");

	await loginUser(login, password);
});

async function loginUser(login: string, password: string)
{
	const response = await fetch("api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			login: login,
			password: password
		})
	});
	console.log(response.status);
}