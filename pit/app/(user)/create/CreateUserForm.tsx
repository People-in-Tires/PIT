"use client";

import "./create.css";
import { signup } from "./actions";
import { useActionState, useEffect } from "react";
import { countryOptions } from "@/app/lib/countries";
import { useRouter } from "next/navigation";
import { days, months, years } from "@/app/lib/birthday";

export default function CreateUserForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state?.success, router]);

  return (
    <div className="create-user-page">
      <img id="logo" src="/PIT.png" alt="Logo" />
      <h1 className="create-h1">Create new PIT member</h1>

      <form action={action} className="create-form" key={state?.timestamp}>
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
            defaultValue={state?.values?.name ?? ""}
          />
        </div>
        {state?.errors?.name && <p className="error">{state.errors.name}</p>}

        <div>
          <fieldset>
            <legend>Birthday: </legend>
            <select
              id="birthday-day"
              name="birthday-day"
              defaultValue={state?.values?.day ?? ""}
            >
              <option value="" disabled>
                Day
              </option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              id="birthday-month"
              name="birthday-month"
              defaultValue={state?.values?.month ?? ""}
            >
              <option value="" disabled>
                Month
              </option>
              {months.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              id="birthday-year"
              name="birthday-year"
              defaultValue={state?.values?.year ?? ""}
            >
              <option value="" disabled>
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </fieldset>
        </div>
        {state?.errors?.birthday && (
          <p className="error">{state.errors.birthday}</p>
        )}

        <div>
          <label htmlFor="country">Country: </label>
          <select
            id="country"
            name="country"
            defaultValue={state?.values?.country ?? ""}
          >
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

        <button className="create-button" disabled={pending} type="submit">
          {"🏁 Join the Pit Crew"}
        </button>
      </form>
    </div>
  );
}
