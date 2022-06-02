import { FC } from "react";

interface props {
  className?: string,
  size: number,
  color: string,
  onClick?: () => void,
}

const ArrowIcon: FC<props> = ({ className, size, color, onClick }) => {
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
      <path
        d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"
      />
    </svg>
  );
}

export default ArrowIcon;
