"use client";

import "./settings.css";
import { useState } from "react";
import { useEscape } from "@/app/lib/hooks/useEscape";
import { EditProfile, type Profile } from "./edit/EditProfile";
import { ChangePassword } from "./change-password/ChangePasswordForm";
import { DeleteProfile } from "./delete/DeleteProfile";
import { Logout } from "./logout/Logout";

type ModalName = "edit" | "account" | "delete" | null;

type SettingsOverlayProps = {
  profile: Profile;
  connections: { github: boolean, fortyTwo: boolean };
};

export function SettingsOverlay({ profile }: SettingsOverlayProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalName>(null);

  useEscape(() => setMenuOpen(false), menuOpen);

  function openModal(modal: Exclude<ModalName, null>) {
    setMenuOpen(false);
    setActiveModal(modal);
  }

  function closeModal() {
    setActiveModal(null);
  }

  return (
    <div className="settings">
      <button
        type="button"
        className="settings-button"
        aria-label="Settings"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <img src="/icons/settings.png" alt="" className="settings-icon" />
      </button>

      {menuOpen && (
        <>
          <div className="settings-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="settings-menu">
            <button type="button" onClick={() => openModal("edit")}>
              Edit Profile
            </button>
            <button type="button" onClick={() => openModal("account")}>
              Account & security
            </button>
            <Logout />
            <button type="button" onClick={() => openModal("delete")}>
              Delete Profile
            </button>
          </div>
        </>
      )}

      {activeModal === "edit" && <EditProfile profile={profile} onClose={closeModal} />}
      {activeModal === "account" && <ChangePassword onClose={closeModal} />}
      {activeModal === "delete" && <DeleteProfile onClose={closeModal} />}
    </div>
  );
}
