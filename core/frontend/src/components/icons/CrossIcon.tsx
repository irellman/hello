import { FC } from "react";

interface props {
  className?: string
  size: number,
  color: string,
  onClick?: any
}

export const CrossIcon: FC<props> = ({ className, size, color, onClick }) => {
  return (
    <svg
      className={className}
      color={color}
      fill={color}
      role="img"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      onClick={onClick}
    >
      <polyline
        fill="none"
        points="20.643 3.357 12 12 3.353 20.647"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        x1="20.649"
        x2="3.354"
        y1="20.649"
        y2="3.354"
      />
    </svg>
  )
}
