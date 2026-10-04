"use client";

import "./settings.css";
import "../modal.css";
import { useState } from "react";
import { EditProfile, type Profile } from "./edit/EditProfile";
import { ChangePassword } from "./change-password/ChangePassword";
import { DeleteProfile } from "./delete/DeleteProfile";
import { Connect42, ConnectGitHub } from "./connections/Connections";
import { Logout } from "./logout/Logout";

type ModalName = "edit" | "password" | "delete" | null;

export function SettingsOverlay({
  profile,
  connectedProviders,
}: {
  profile: Profile;
  connectedProviders: string[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalName>(null);

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
        onClick={() => setMenuOpen((open) => !open)}
      >
        ⚙️
      </button>

      {menuOpen && (
        <>
          <div className="settings-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="settings-menu">
            <button type="button" onClick={() => openModal("edit")}>
              Edit Profile
            </button>
            <button type="button" onClick={() => openModal("password")}>
              Change Password
            </button>
            <ConnectGitHub connected={connectedProviders.includes("github")} />
            <Connect42 connected={connectedProviders.includes("42-school")} />
            <Logout />
            <button type="button" onClick={() => openModal("delete")}>
              Delete Profile
            </button>
          </div>
        </>
      )}

      {activeModal === "edit" && <EditProfile profile={profile} onClose={closeModal} />}
      {activeModal === "password" && <ChangePassword onClose={closeModal} />}
      {activeModal === "delete" && <DeleteProfile onClose={closeModal} />}
    </div>
  );
}