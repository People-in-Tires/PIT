import { THEMES, type ThemeId } from "@/app/lib/themes"


type ThemePickerProps = {
  value: ThemeId;
  onChange: (id: ThemeId) => void;
};

export function ThemePicker({ value, onChange }: ThemePickerProps) {
  return (
    <fieldset className="edit-picker">
      <legend className="edit-legend">Theme</legend>
      <div className="edit-themes">
        {THEMES.map((theme) => (
          <label key={theme.id} className="edit-theme">
            <input
              type="radio"
              name="theme"
              value={theme.id}
              checked={value === theme.id}
              onChange={() => onChange(theme.id)}
              className="edit-radio"
            />
            <img src={`/themes/${theme.id}.svg`} alt="" className="edit-theme-banner" />
            <span className="edit-theme-name">{theme.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}