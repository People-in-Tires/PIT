"use client";

import "./create.css";
import { signup } from "./actions";
import { useActionState, useEffect } from "react";
import { countryOptions } from "@/app/lib/countries";
import { useRouter } from "next/navigation";

type Props = {
  mode: "signup" | "complete";
  prefill?: { name: string; email: string };
};

export default function CreateUserForm({ mode, prefill }: Props) {
  const [state, action, pending] = useActionState(signup, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state?.success, router]);

  return (
    <div className="new-user-page">
      <img id="logo" src="/PIT.png" alt="Logo" />
      <h1 className="new-h1">
        {mode === "complete"
          ? "Finish setting up your account"
          : "Create new PIT member"}
      </h1>

      <form action={action} className="new-form">
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            name="username"
            defaultValue={state?.values?.username ?? ""}
          />
        </div>
        {state?.errors?.username && (
          <p className="error">{state.errors.username}</p>
        )}

        <div>
          <label htmlFor="name">Full name: </label>
          <input
            id="name"
            name="name"
            defaultValue={state?.values?.name ?? prefill?.name ?? ""}
          />
        </div>
        {state?.errors?.name && <p className="error">{state.errors.name}</p>}

        <div>
          <label htmlFor="birthday">Birthday: </label>
          <input
            id="birthday"
            name="birthday"
            placeholder="YYYY-MM-DD"
            defaultValue={state?.values?.birthday ?? ""}
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

        {mode === "signup" && (
          <div className="credentials">
            <div>
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={state?.values?.email ?? ""}
              />
            </div>
            {state?.errors?.email && (
              <p className="error">{state.errors.email}</p>
            )}
            <div>
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
              />
            </div>
            {state?.errors?.password && (
              <ul className="error">
                {state.errors.password.map((e) => (
                  <li key={e}>- {e}</li>
                ))}
              </ul>
            )}
            <div>
              <label htmlFor="password2">Confirm password: </label>
              <input
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
        )}
        {mode === "complete" && (
          <input type="hidden" name="email" value={prefill?.email} />
        )}

        <button className="new-button" disabled={pending} type="submit">
          {mode === "complete" ? "Finish setup" : "🏁 Join the Pit Crew"}
        </button>
      </form>
    </div>
  );
}
