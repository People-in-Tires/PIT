"use client";

export function ChangePassword({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <form>
          <label htmlFor="currentPassword">Current password: </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            placeholder="********"
          />
          <label htmlFor="password">New password: </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
          />
          <label htmlFor="password2">Confirm new password: </label>
          <input
            id="password2"
            name="password2"
            type="password"
            placeholder="********"
          />
          <div className="modal-buttons">
            <button type="submit" className="btn-confirm" disabled>
              Confirm
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
