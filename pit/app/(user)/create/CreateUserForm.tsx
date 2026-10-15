"use client";

import "./create.css";
import { signup } from "./actions";
import { useActionState, useEffect } from "react";
import { countryOptions } from "@/app/lib/countries";
import { useRouter } from "next/navigation";
import { days, months, years } from "@/app/lib/birthday";
import Link from "next/link";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="error">{errors[0]}</p>;
}

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
      <img className="create-logo" src="/PIT.png" alt="Logo" />

      <form action={action} className="create-form" key={state?.timestamp}>
        <p className="create-banner">Create new PIT member</p>

        <div className="create-columns">
          <section className="create-personal">
            <p className="create-column-title">About you</p>

            <div className="create-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                autoComplete="username"
                defaultValue={state?.values?.username ?? ""}
              />
              <FieldError errors={state?.errors?.username} />
            </div>

            <div className="create-field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                defaultValue={state?.values?.name ?? ""}
              />
              <FieldError errors={state?.errors?.name} />
            </div>

            <fieldset className="create-field">
              <legend>Birthday</legend>
              <div className="create-birthday">
                <select
                  id="birthday-day"
                  name="birthday-day"
                  aria-label="Day"
                  autoComplete="bday-day"
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
                  aria-label="Month"
                  autoComplete="bday-month"
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
                  aria-label="Year"
                  autoComplete="bday-year"
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
              </div>
              <FieldError errors={state?.errors?.birthday} />
            </fieldset>

            <div className="create-field">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                autoComplete="country"
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
              <FieldError errors={state?.errors?.country} />
            </div>
          </section>

          <section className="create-credentials">
            <p className="create-column-title">Your login</p>

            <div className="create-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={state?.values?.email ?? ""}
              />
              <FieldError errors={state?.errors?.email} />
            </div>

            <div className="create-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="********"
              />
              {state?.errors?.password && (
                <ul className="error">
                  {state.errors.password.map((e) => (
                    <li key={e}>- {e}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="create-field">
              <label htmlFor="password2">Confirm password</label>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="new-password"
                placeholder="********"
              />
              <FieldError errors={state?.errors?.password2} />
            </div>
          </section>
        </div>

        <div className="create-footer">
          {state?.message && <p className="error">{state.message}</p>}

          <button className="create-button" disabled={pending} type="submit">
            {pending ? "Joining..." : "🏁 Join the Pit Crew"}
          </button>

          <p className="create-login">
            Already a member? <Link href="/login">Log in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
