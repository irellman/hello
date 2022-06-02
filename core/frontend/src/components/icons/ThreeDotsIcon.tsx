import { FC } from "react";

interface props {
  cname?: string,
  size: number,
  color: string,
  onClick?: () => void,
  filled?: boolean
}

const ThreeDotsIcon: FC<props> = ({ cname, size, color, onClick, filled }) => {
  return (
    <svg
      className={cname}
      color={color}
      fill={color}
      role="img"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      onClick={onClick}
    >
      <circle cx="12" cy="12" r="1.5"></circle>
      <circle cx="6" cy="12" r="1.5"></circle>
      <circle cx="18" cy="12" r="1.5"></circle>
    </svg>
  );
}

export default ThreeDotsIcon;
