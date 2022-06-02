import { FC } from "react";

interface props {
  size: number,
  color: string
}

const PlusIcon: FC<props> = ({ size, color }) => {
  return (
    <svg
      color={color}
      fill={color}
      role="img"
      viewBox="0 0 24 24"
      height={size}
      width={size}
    >
      <circle
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill="none"
        cx="12.001"
        cy="12.005"
        r="10.5"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="7.001"
        x2="17.001"
        y1="12.005"
        y2="12.005"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="12.001"
        x2="12.001"
        y1="7.005"
        y2="17.005"
      />
    </svg>
  )
}

export default PlusIcon;
