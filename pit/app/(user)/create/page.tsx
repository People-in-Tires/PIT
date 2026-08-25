"use client";

import { signup } from "@/app/actions/auth";
import { goToPage } from "@/app/actions/nav";
import { useActionState } from "react";
import { countryOptions } from "@/app/lib/countries";
import "./create.css";

export default function CreateUser() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="flex items-center flex-col">
      <img className="size-80" id="logo" src="/PIT.png" alt="Logo" />
      <h1 className="new-h1">Create new PIT member</h1>

      <form action={action} className="text-2xl flex items-center flex-col">
        <div>
          <label htmlFor="username">Username: </label>
          <input
            className="new-input"
            id="username"
            name="username"
            defaultValue={state?.values?.username ?? ""}
          />
        </div>
        {state?.errors?.username && (
          <p className="error">{state.errors.username}</p>
        )}
        <div>
          <label htmlFor="firstname">First name: </label>
          <input
            className="new-input"
            id="firstname"
            name="firstname"
            defaultValue={state?.values?.firstname ?? ""}
          />
        </div>
        {state?.errors?.firstname && (
          <p className="error">{state.errors.firstname}</p>
        )}
        <div>
          <label htmlFor="lastname">Last name: </label>
          <input
            className="new-input"
            id="lastname"
            name="lastname"
            defaultValue={state?.values?.lastname ?? ""}
          />
        </div>
        {state?.errors?.lastname && (
          <p className="error">{state.errors.lastname}</p>
        )}
        <div>
          <label htmlFor="birthday">Birthday: </label>
          <input
            className="new-input"
            id="birthday"
            name="birthday"
            defaultValue={state?.values?.birthday ?? ""}
            placeholder="YYYY-MM-DD"
          />
        </div>
        {state?.errors?.birthday && (
          <p className="error">{state.errors.birthday}</p>
        )}
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
        {state?.errors?.country && (
          <p className="error">{state.errors.country}</p>
        )}
        <div className="credentials">
          <div>
            <label htmlFor="email">Email: </label>
            <input
              className="new-input"
              id="email"
              name="email"
              defaultValue={state?.values?.email ?? ""}
            />
          </div>
          {state?.errors?.email && (
            <p className="error">{state.errors.email}</p>
          )}
          <div>
            <label htmlFor="password">Password: </label>
            <input
              className="new-input"
              id="password"
              name="password"
              type="password"
              placeholder="********"
            />
          </div>
          {state?.errors?.password && (
            <div>
              <p className="error">Password must:</p>
              <ul className="error">
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <label htmlFor="password2">Confirm password: </label>
            <input
              className="new-input"
              id="password2"
              name="password2"
              type="password"
              placeholder="********"
            />
          </div>
          {state?.errors?.password2 && (
            <p className="error">{state.errors.password2}</p>
          )}
        </div>
        <div className="text-2xl/5">
          <button
            className="new-button"
            id="save-profile"
            disabled={pending}
            type="submit"
          >
            🏁 Join the Pit Crew
          </button>
        </div>

        {state?.success && goToPage("/login")}
      </form>
    </div>
  );
}
