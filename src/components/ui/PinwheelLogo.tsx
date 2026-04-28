import { cn } from "@/lib/utils";

interface PinwheelLogoProps {
  className?: string;
}

export function PinwheelLogo({ className }: PinwheelLogoProps) {
  return (
    <svg
      viewBox="159 66 113 113"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-10 h-10", className)}
      role="img"
      aria-label="Perspective Health"
    >
      <polygon fill="#03ab8e" points="176.31 121.03 211.18 121.03 199.89 109.75 161.22 105.95 176.31 121.03" />
      <polygon fill="#81c44d" points="213.57 118.65 213.57 83.78 198.48 68.69 202.28 107.36 213.57 118.65" />
      <polygon fill="#894c9e" points="216.94 118.65 228.23 107.36 232.03 68.69 216.94 83.78 216.94 118.65" />
      <polygon fill="#21c1dc" points="254.2 121.03 269.28 105.95 230.62 109.75 219.33 121.03 254.2 121.03" />
      <polygon fill="#21c1dc" points="211.18 124.41 176.31 124.41 161.22 139.5 199.89 135.7 211.18 124.41" />
      <polygon fill="#03ab8e" points="254.2 124.41 219.33 124.41 230.62 135.7 269.28 139.5 254.2 124.41" />
      <polygon fill="#81c44d" points="216.94 126.8 216.94 161.67 232.03 176.75 228.23 138.09 216.94 126.8" />
      <polygon fill="#894c9e" points="213.57 126.8 202.28 138.09 198.48 176.75 213.57 161.67 213.57 126.8" />
      <polygon fill="#81c44d" points="196.4 166.94 199.18 138.81 171.04 141.58 196.4 166.94" />
      <polygon fill="#81c44d" points="234.11 78.51 231.33 106.64 259.47 103.87 234.11 78.51" />
      <polygon fill="#21c1dc" points="259.47 141.58 231.34 138.8 234.11 166.94 259.47 141.58" />
      <polygon fill="#21c1dc" points="171.04 103.87 199.17 106.65 196.4 78.51 171.04 103.87" />
    </svg>
  );
}
