"use client";

import { signup } from "@/app/actions/auth";
import { useActionState } from "react";
import { countryOptions } from "@/app/lib/countries";

export default function CreateUser() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="flex items-center flex-col">
      <img className="size-80" id="logo" src="/PIT.png" alt="Logo" />
      <h1 className="text-5xl/25">Create new PIT member</h1>

      {state?.message && <p className="text-2xl">{state.message}</p>}

      <form action={action} className="text-2xl flex items-center flex-col">
        <div>
          <label htmlFor="username">Username: </label>
          <input id="username" name="username" />
        </div>
        {state?.errors?.username && <p>{state.errors.username}</p>}
        <div>
          <label htmlFor="firstname">First name: </label>
          <input id="firstname" name="firstname" />
        </div>
        {state?.errors?.firstname && <p>{state.errors.firstname}</p>}
        <div>
          <label htmlFor="lastname">Last name: </label>
          <input id="lastname" name="lastname" />
        </div>
        {state?.errors?.lastname && <p>{state.errors.lastname}</p>}
        <div>
          <label htmlFor="birthday">Birthday: </label>
          <input id="birthday" name="birthday" placeholder="YYYY-MM-DD" />
        </div>
        {state?.errors?.birthday && <p>{state.errors.birthday}</p>}
        <div>
          <label htmlFor="country">Country: </label>
          <select id="country" name="country" defaultValue="">
            <option value="" disabled>
              Select a country
            </option>
            {Object.entries(countryOptions).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        {state?.errors?.country && <p>{state.errors.country}</p>}
        <div className="credentials">
          <div>
            <label htmlFor="email">Email: </label>
            <input id="email" name="email" />
          </div>
          {state?.errors?.email && <p>{state.errors.email}</p>}
          <div>
            <label htmlFor="password">Password: </label>
            <input id="password" name="password" type="password" />
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
          <div>
            <label htmlFor="password2">Confirm password: </label>
            <input id="password2" name="password2" type="password" />
          </div>
        </div>
        <div className="text-2xl/5">
          <button id="save-profile" disabled={pending} type="submit">
            🏁 Join the Pit Crew
          </button>
        </div>
      </form>
    </div>
  );
}
