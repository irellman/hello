import {FC} from "react";

interface props {
  className?: string
  size: number,
  color: string,
}

const CommentsIcon: FC<props> = ({ className, size, color }) => {
  return (
    <svg
      className={className}
      color={color}
      fill={color}
      role="img"
      viewBox="0 0 24 24"
      height={size}
      width={size}
    >
      <path
        d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export default CommentsIcon;
