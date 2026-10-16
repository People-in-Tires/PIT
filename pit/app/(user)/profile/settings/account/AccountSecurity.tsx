"use client";

import "./account.css";
import { Modal } from "@/app/components/ui/Modal";
import { LinkedAccountStatus } from "./linked-accounts/definitions";
import { LinkedAccounts } from "./linked-accounts/LinkedAccounts";
import { ChangePasswordForm } from "./change-password/ChangePasswordForm";

type AccountSecurityProps = {
  linkedAccounts: LinkedAccountStatus;
  onClose: () => void;
};

export function AccountSecurity({ linkedAccounts, onClose }: AccountSecurityProps) {
  return (
    <Modal title="Account & security" onClose={onClose} size="md">
      <section className="account-section">
        <h3 className="account-heading">Password</h3>
        <ChangePasswordForm />
      </section>

      <section className="account-section">
        <h3 className="account-heading">Two-factor authentication</h3>
        <p className="account-soon">Coming soon.</p>
      </section>

      <section className="account-section">
        <h3 className="account-heading">Linked accounts</h3>
        <LinkedAccounts linkedAccounts={linkedAccounts} />
      </section>

      <div className="account-actions">
        <button type="button" className="account-close" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}