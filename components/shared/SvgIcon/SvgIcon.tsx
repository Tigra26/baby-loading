import HeartIcon from "@/assets/icons/heart.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import UserIcon from "@/assets/icons/user.svg";
import LogoutIcon from "@/assets/icons/logout.svg";

const icons = {
  heart: HeartIcon,
  calendar: CalendarIcon,
  user: UserIcon,
  logout: LogoutIcon,
};

export type IconName = keyof typeof icons;

type SvgIconProps = {
  name: IconName;
  size?: number;
  className?: string;
  "aria-label"?: string;
};

export function SvgIcon({
  name,
  size = 24,
  className,
  "aria-label": ariaLabel,
}: SvgIconProps) {
  const Icon = icons[name];

  return (
    <Icon
      width={size}
      height={size}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    />
  );
}
