import { FC } from "react";

interface props {
  className?: string,
  size: number,
  color: string,
  onClick?: () => void,
  filled?: boolean
}

const BookmarkIcon: FC<props> = ({ className, size, color, onClick, filled }) => {
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
      {filled ?
        <path
          d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"
        />
        :
        <polygon
          fill="none"
          points="20 21 12 13.44 4 21 4 3 20 3 20 21"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      }
    </svg>
  );
}

export default BookmarkIcon;
