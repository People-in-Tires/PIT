"use client";

import "./edit.css";
import { useActionState, useEffect, useEffectEvent, useState } from "react";
import { Modal } from "@/app/components/ui/Modal";
import { Avatar } from "@/app/components/ui/Avatar";
import { avatarFile, avatarId } from "@/app/lib/avatars";
import {
  THEME_MODES,
  getTheme,
  getThemeId,
  getThemeMode,
  type ThemeId,
  type ThemeMode,
} from "@/app/lib/themes";
import { countryOptions } from "@/app/lib/countries";
import { days, months, years } from "@/app/lib/birthday";
import { AvatarPicker } from "./avatar/AvatarPicker";
import { ThemePicker } from "./theme/ThemePicker";
import { updateProfile } from "./actions";
import type { EditableProfile, EditProfileValues } from "./definitions";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="edit-error">{errors[0]}</p>;
}

function toValues(profile: EditableProfile): EditProfileValues {
  return {
    username: profile.username,
    name: profile.name,
    country: profile.country,
    day: String(profile.birthday.getUTCDate()),
    month: String(profile.birthday.getUTCMonth() + 1),
    year: String(profile.birthday.getUTCFullYear()),
  };
}

// Live preview: the same attributes the root layout sets on <html>
function preview(theme: ThemeId, mode: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.mode = mode;
}

type EditProfileProps = {
  profile: EditableProfile;
  onClose: () => void;
};

export function EditProfile({ profile, onClose }: EditProfileProps) {
  const savedTheme = getThemeId(profile.theme);
  const savedMode = getThemeMode(profile.themeMode);

  const [avatar, setAvatar] = useState<ThemeId>(avatarId(profile.image));
  const [theme, setTheme] = useState<ThemeId>(savedTheme);
  const [mode, setMode] = useState<ThemeMode>(savedMode);
  const [state, formAction, pending] = useActionState(updateProfile, undefined);

  const values = state?.values ?? toValues(profile);

  const closeAfterSave = useEffectEvent(onClose);
  useEffect(() => {
    if (state?.success) closeAfterSave();
  }, [state]);

  function chooseAvatar(id: ThemeId) {
    setAvatar(id);
  }

  function chooseTheme(id: ThemeId) {
    setTheme(id);
    preview(id, mode);
  }

  function chooseMode(next: ThemeMode) {
    setMode(next);
    preview(theme, next);
  }

  function cancel() {
    preview(savedTheme, savedMode);
    onClose();
  }

  return (
    <Modal title="Edit profile" onClose={cancel} size="lg" closable={!pending}>
      <form action={formAction} className="edit-form" key={state?.timestamp}>
        <div className="edit-columns">
          <section className="edit-details">
            <Avatar image={avatarFile(avatar)} className="edit-preview" />
            <p className="edit-preview-name">{getTheme(avatar).name}</p>

            <div className="edit-field">
              <label htmlFor="edit-username">Username</label>
              <input
                id="edit-username"
                name="username"
                autoComplete="username"
                defaultValue={values.username}
              />
              <FieldError errors={state?.errors?.username} />
            </div>

            <div className="edit-field">
              <label htmlFor="edit-name">Full name</label>
              <input id="edit-name" name="name" autoComplete="name" defaultValue={values.name} />
              <FieldError errors={state?.errors?.name} />
            </div>

            <div className="edit-field">
              <label htmlFor="edit-country">Country</label>
              <select
                id="edit-country"
                name="country"
                autoComplete="country"
                defaultValue={values.country}
              >
                {Object.entries(countryOptions).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <FieldError errors={state?.errors?.country} />
            </div>

            <fieldset className="edit-field">
              <legend>Birthday</legend>
              <div className="edit-birthday">
                <select name="birthday-day" aria-label="Day" defaultValue={values.day}>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select name="birthday-month" aria-label="Month" defaultValue={values.month}>
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select name="birthday-year" aria-label="Year" defaultValue={values.year}>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <FieldError errors={state?.errors?.birthday} />
            </fieldset>
          </section>

          <section className="edit-looks">
            <fieldset className="edit-picker">
              <legend className="edit-legend">Mode</legend>
              <div className="edit-modes">
                {THEME_MODES.map((option) => (
                  <label key={option} className="edit-mode">
                    <input
                      type="radio"
                      name="themeMode"
                      value={option}
                      checked={mode === option}
                      onChange={() => chooseMode(option)}
                      className="edit-radio"
                    />
                    {option === "day" ? "Day" : "Night"}
                  </label>
                ))}
              </div>
            </fieldset>

            <AvatarPicker value={avatar} onChange={chooseAvatar} />
            <ThemePicker value={theme} onChange={chooseTheme} />
          </section>
        </div>

        {state?.message && <p className="edit-error">{state.message}</p>}

        <div className="modal-actions">
          <button type="button" className="edit-cancel" onClick={cancel} disabled={pending}>
            Cancel
          </button>
          <button type="submit" className="edit-save" disabled={pending}>
            {pending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}