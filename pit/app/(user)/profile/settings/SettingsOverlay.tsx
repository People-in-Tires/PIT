"use client";

import "./settings.css";
import { useState } from "react";
import { useEscape } from "@/app/lib/hooks/useEscape";
import { EditProfile } from "./edit/EditProfile";
import { DeleteProfile } from "./delete/DeleteProfile";
import { Logout } from "./logout/Logout";
import { LinkedAccountStatus } from "./account/linked-accounts/definitions";
import { AccountSecurity } from "./account/AccountSecurity";
import { EditableProfile } from "./edit/definitions";

type ModalName = "edit" | "account" | "delete" | null;

type SettingsOverlayProps = {
  profile: EditableProfile;
  linkedAccounts: LinkedAccountStatus;
};

export function SettingsOverlay({ profile, linkedAccounts }: SettingsOverlayProps) {
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
      {activeModal === "account" && <AccountSecurity linkedAccounts={linkedAccounts} onClose={closeModal} />}
      {activeModal === "delete" && <DeleteProfile onClose={closeModal} />}
    </div>
  );
}
