import { cn } from "@/lib/utils";

interface PinwheelLogoProps {
  className?: string;
}

export function PinwheelLogo({ className }: PinwheelLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-10 h-10", className)}
      aria-hidden="true"
    >
      {/* Teal petal - top-right */}
      <path
        d="M50 50 C55 35 65 25 80 20 C75 35 65 45 50 50 Z"
        fill="#5BBCD6"
      />
      {/* Teal petal - bottom-left */}
      <path
        d="M50 50 C45 65 35 75 20 80 C25 65 35 55 50 50 Z"
        fill="#5BBCD6"
      />
      {/* Purple petal - top-left */}
      <path
        d="M50 50 C35 45 25 35 20 20 C35 25 45 35 50 50 Z"
        fill="#7B4F9E"
      />
      {/* Purple petal - bottom-right */}
      <path
        d="M50 50 C65 55 75 65 80 80 C65 75 55 65 50 50 Z"
        fill="#7B4F9E"
      />
      {/* Green petal - top */}
      <path
        d="M50 50 C50 35 55 20 50 5 C45 20 50 35 50 50 Z"
        fill="#5BAD6F"
      />
      {/* Green petal - bottom */}
      <path
        d="M50 50 C50 65 45 80 50 95 C55 80 50 65 50 50 Z"
        fill="#5BAD6F"
      />
      {/* Green petal - right */}
      <path
        d="M50 50 C65 50 80 45 95 50 C80 55 65 50 50 50 Z"
        fill="#5BAD6F"
        opacity="0.7"
      />
      {/* Green petal - left */}
      <path
        d="M50 50 C35 50 20 55 5 50 C20 45 35 50 50 50 Z"
        fill="#5BAD6F"
        opacity="0.7"
      />
      {/* Center circle */}
      <circle cx="50" cy="50" r="6" fill="white" />
      <circle cx="50" cy="50" r="3.5" fill="#2C2C2C" />
    </svg>
  );
}
