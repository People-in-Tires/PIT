"use client";

import "./settings.css";
import { useState } from "react";
import { EditProfile, Profile } from "./edit/EditProfile";

type ModalName = "edit" | "password" | "delete" | null;

export function SettingsOverlay({ profile }: { profile: Profile }) {
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
        onClick={() => setMenuOpen(true)}
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
            <button type="button" onClick={() => openModal("change")}>
              Change Password
            </button>
            <button type="button" onClick={() => openModal("connect42")}>
              Connect 42
            </button>
            <button type="button" onClick={() => openModal("connectgithub")}>
              Connect GitHub
            </button>
            <button type="button" onClick={() => openModal("logout")}>
              Logout
            </button>
            <button type="button" onClick={() => openModal("delete")}>
              Delete Profile
            </button>
          </div>
        </>
      )}

      {activeModal === "edit" && (
        <EditProfile profile={profile} onClose={closeModal} />
      )}
    </div>
  );
}