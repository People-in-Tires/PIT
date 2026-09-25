export default function ChatIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        fill="#1b1b1b"
        stroke="#ffd000"
        strokeWidth="1.5"
      />
      <circle cx="8" cy="11" r="1.2" fill="#ffd000" />
      <circle cx="12" cy="11" r="1.2" fill="#ffd000" />
      <circle cx="16" cy="11" r="1.2" fill="#ffd000" />
    </svg>
  );
}