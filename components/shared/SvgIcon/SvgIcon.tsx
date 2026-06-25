import AccountCircleIcon from "@/assets/icons/account_circle.svg";
import BookIcon from "@/assets/icons/book_2.svg";
import ChairIcon from "@/assets/icons/chair.svg";
import CloseIcon from "@/assets/icons/close.svg";
import ConversionPathIcon from "@/assets/icons/conversion_path.svg";
import DeleteIcon from "@/assets/icons/delete_forever.svg";
import EditIcon from "@/assets/icons/edit_square.svg";
import FitnessIcon from "@/assets/icons/fitness_center.svg";
import ForkSpoonIcon from "@/assets/icons/fork_spoon.svg";
import GoogleIcon from "@/assets/icons/Google.svg";
import ArrowDownIcon from "@/assets/icons/keyboard_arrow_down.svg";
import ArrowUpIcon from "@/assets/icons/keyboard_arrow_up.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import TodayIcon from "@/assets/icons/today.svg";
import LogoIcon from "@/assets/icons/logo.svg";

const icons = {
  account: AccountCircleIcon,
  book: BookIcon,
  chair: ChairIcon,
  close: CloseIcon,
  conversion: ConversionPathIcon,
  delete: DeleteIcon,
  edit: EditIcon,
  fitness: FitnessIcon,
  food: ForkSpoonIcon,
  google: GoogleIcon,
  arrowDown: ArrowDownIcon,
  arrowUp: ArrowUpIcon,
  logout: LogoutIcon,
  menu: MenuIcon,
  today: TodayIcon,
  logo: LogoIcon,
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
