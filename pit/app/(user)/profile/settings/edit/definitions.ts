import * as z from "zod";
import { birthdayField, countryField, nameField, usernameField } from "@/app/lib/user-fields";
import { THEME_IDS, THEME_MODES } from "@/app/lib/themes";

export const EditProfileSchema = z.object({
  username: usernameField,
  name: nameField,
  birthday: birthdayField,
  country: countryField,
  avatar: z.enum(THEME_IDS, { error: "Pick one of the avatars."}),
  theme: z.enum(THEME_IDS, { error: "Pick one of the themess."}),
  themeMode: z.enum(THEME_MODES, { error: "Pick day or night."}),
});

type EditProfileFields = z.infer<typeof EditProfileSchema>;

export type EditableProfile = {
  username: string,
  name: string,
  country: string,
  birthday: Date;
  image: string;
  theme: string;
  themeMode: string;
};

export type EditProfileValues = {
  username: string;
  name: string;
  country: string;
  day: string;
  month: string;
  year: string;
};

export type EditProfileState =
  | {
      errors?: Partial<Record<keyof EditProfileFields, string[]>>;
      values?: EditProfileValues;
      message?: string;
      success?: boolean;
      timestamp?: number;
    }
  | undefined;
