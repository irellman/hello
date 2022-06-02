import { FC } from "react";

interface props {
  size: number,
  color: string
}

const SearchIcon: FC<props> = ({ size, color }) => {
  return (
    <svg
    color={color}
    fill={color}
    role="img"
    viewBox="0 0 24 24"
    height={size}
    width={size}
    >
      <path
        d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="16.511"
        x2="22"
        y1="16.511"
        y2="22"
      />
    </svg>
  )
}

export default SearchIcon;