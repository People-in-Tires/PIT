import Link from "next/link";

export default async function TermsPage() {

  return (
    <main className="terms-page">
      <div className="terms-links">
        <Link className="screen-button secondary" href="/profile">
          Go back to profile
        </Link>
      </div>
      <div className="terms-of-service">
        <h1 className="terms-page">
          Terms of Service
        </h1>
        <h2>1. Acceptance of terms</h2>
        <span>
          By creating an account and using the website the accepts the terms. 
        </span>
        <h2>2. About the service</h2>
        <span>
          The app is an online multiplayer game where you can play the pitcrew, enter lobbies, make friends and chat through the global chat. This is a noncommercial 42 studentproject. 
        </span>
        <h2>3. Eligibility</h2>
        <span>
          Minimum age is 13, this will be checked when a account is created.
        </span>
        <h2>4. Accounts</h2>
        <span>
          It is possible to make 1 account per emailaddress. As user you are responsible to remember you password. But in case you forgot you have to be able to access the email account you signed up with. 
        </span>
        <h2>5. Acceptable use</h2>
        <span>
          The intent of the game is as long as it is fun, let's do it. But we would like to kindly ask you to not participate in the following:
          - Insulting, intimidating, discriminating in the chat
          - Use inappropriate usernames, lobby names, or profile pictures
          - Attempting to hack or overload the app or other accounts
          - Impersonating someone else
        </span>
        <h2>6. User content</h2>
        <span>
          The user retains ownership of their avatar and chat messages, but grants you permission to display them within the app. The user is personally responsible for what they post.
        </span>
        <h2>7. Moderation and termination</h2>
        <span>
          There is no moderation in place in the chat. A user can always choose to delete their profile by going to settings : delete profile.
        </span>
        <h2>8. Game data</h2>
        <span>
          Nothing is done with the game data at this point accept for storing in the database.
        </span>
        <h2>9. Availability and disclaimer</h2>
        <span>
          This is a student project. It's delivered "as is". There is a possibility it goes offline.
        </span>
        <h2>10. Limitation of liability</h2>
        <span>
          We are not responsible for any damage after using the app.
        </span>
        <h2>11. Privacy</h2>
        <span>
          If you want to look at our privacy policy click the link 
          <Link href="/privacy">Privacy policy</Link>
        </span>
      </div>
    </main>
  );
}