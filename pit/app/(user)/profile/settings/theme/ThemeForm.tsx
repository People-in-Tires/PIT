// app/profile/settings/theme/ThemeForm.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { THEMES, getTheme, type ThemeId } from "@/lib/themes";
import { updateTheme, type ThemeState } from "./actions";
import "./theme.css";

type Props = {
  currentTheme: ThemeId;
};

const initialState: ThemeState = { success: false, timestamp: 0 };

// Live preview: overrides the same variables the layout sets on <body>
function applyTheme(id: string) {
  const theme = getTheme(id);
  document.body.style.setProperty("--accent", theme.accent);
  document.body.style.setProperty("--on-accent", theme.onAccent);
}

export default function ThemeForm({ currentTheme }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ThemeId>(currentTheme);
  const [state, formAction, pending] = useActionState(
    updateTheme,
    initialState,
  );

  // Close the overlay after a successful save
  useEffect(() => {
    if (state.success) setOpen(false);
  }, [state.timestamp, state.success]);

  function openPicker() {
    setSelected(currentTheme);
    setOpen(true);
  }

  // Cancel = undo the preview and close
  function cancel() {
    applyTheme(currentTheme);
    setSelected(currentTheme);
    setOpen(false);
  }

  function choose(id: ThemeId) {
    setSelected(id);
    applyTheme(id);
  }

  return (
    <>
      <button type="button" onClick={openPicker}>
        Change theme
      </button>

      {open && (
        <div
          className="theme-overlay"
          onClick={(e) => e.target === e.currentTarget && cancel()}
          onKeyDown={(e) => e.key === "Escape" && cancel()}
        >
          <div
            className="theme-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-title"
          >
            <h2 id="theme-title" className="theme-title">
              Pick your team
            </h2>

            <form action={formAction}>
              <fieldset className="theme-picker">
                <legend className="sr-only">Theme</legend>

                {THEMES.map((theme) => (
                  <label key={theme.id} className="theme-option">
                    <input
                      type="radio"
                      name="theme"
                      value={theme.id}
                      checked={selected === theme.id}
                      onChange={() => choose(theme.id)}
                    />
                    {theme.logo ? (
                      <img src={theme.logo} alt="" className="theme-logo" />
                    ) : (
                      <span className="theme-logo theme-logo-pit">PIT</span>
                    )}
                    <span className="theme-name">{theme.name}</span>
                  </label>
                ))}
              </fieldset>

              {state.error && <p className="error">{state.error}</p>}

              <div className="theme-buttons">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={cancel}
                >
                  Cancel
                </button>
                <button type="submit" disabled={pending}>
                  {pending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
