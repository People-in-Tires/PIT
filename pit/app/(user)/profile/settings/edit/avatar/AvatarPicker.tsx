import { Avatar } from "@/app/components/ui/Avatar";
import { avatarFile } from "@/app/lib/avatars";
import { ThemeId, THEMES } from "@/app/lib/themes"

type AvatarPickerProps = {
  value: ThemeId;
  onChange: (id: ThemeId) => void;
};

export function AvatarPicker({ value, onChange}: AvatarPickerProps) {
  return (
    <fieldset className="edit-picker">
      <legend className="edit-legend">Avatar</legend>
      <div className="edit-avatars">
        {THEMES.map((theme) => (
          <label key={theme.id} className="edit-avatar-option">
            <input
              type="radio"
              name="avatar"
              value={theme.id}
              checked={value === theme.id}
              onChange={() => onChange(theme.id)}
              className="edit-radio"
            />
            <Avatar image={avatarFile(theme.id)} alt={theme.name} className="edit-avatar-image" />
          </label>
        ))}
      </div>
    </fieldset>
  );
}