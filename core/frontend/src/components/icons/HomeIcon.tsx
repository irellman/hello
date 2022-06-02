import { FC } from "react";

interface props {
  size: number,
  color: string
}

const HomeIcon: FC<props> = ({ size, color }) => {
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
        d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export default HomeIcon;