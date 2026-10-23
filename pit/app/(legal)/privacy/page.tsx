import Link from "next/link";

export default async function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-links">
        <Link className="screen-button primary" href="/terms">
          Terms of Service
        </Link>
        <Link className="screen-button secondary" href="/profile">
          Go to profile
        </Link>
      </div>
      <div className="privacy-policy">
        <h2 className="privacy-page">Privacy policy</h2>
        <ul>
          By creating a People in Tires account you agree to the following
          privacy policy
        </ul>
        <ul>
          The database containing all personal information: name, email,
          password(hashed), country of origin will be wiped after evaluation or
          30 days whichever comes first
        </ul>
      </div>
    </main>
  );
}
